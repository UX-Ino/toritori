"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Item = { id: string; title: string; category: string; image: string | null; story: string | null };

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/portfolio', { cache: 'no-store' });
      if (!res.ok) throw new Error('목록을 불러오지 못했습니다');
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e: any) {
      toast.error(e?.message || '불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-gray-800">포트폴리오 관리</h2>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="bg-amber-600 hover:bg-amber-700 text-white h-9 px-4 rounded-md inline-flex items-center"
            >
              <Plus size={16} className="mr-2" /> 새 작품 추가
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>새 포트폴리오 작품 추가</DialogTitle>
              <DialogDescription>
                작품 정보를 입력하고 이미지를 업로드하세요. 카테고리는 선택 후 제출됩니다.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const fd = new FormData(form);
              const payload = {
                title: String(fd.get('title') || ''),
                category: String(fd.get('category') || ''),
                story: String(fd.get('story') || ''),
                message: String(fd.get('message') || ''),
                emotion: String(fd.get('emotion') || ''),
                image: imagePath || String(fd.get('image') || ''),
              };
              try {
                const res = await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (!res.ok) throw new Error('추가에 실패했습니다');
                toast.success('추가되었습니다');
                await load();
                (document.activeElement as HTMLElement | null)?.blur();
              } catch (err: any) {
                toast.error(err?.message || '추가 실패');
              }
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">작품 제목</label>
                  <Input name="title" placeholder="작품 제목을 입력하세요" required />
                </div>
                <div>
                  <label className="text-sm text-gray-700">카테고리</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="생일">생일</SelectItem>
                      <SelectItem value="웨딩">웨딩</SelectItem>
                      <SelectItem value="기념일">기념일</SelectItem>
                      <SelectItem value="베이비">베이비</SelectItem>
                      <SelectItem value="가족">가족</SelectItem>
                      <SelectItem value="특별한 순간">특별한 순간</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="category" value={category} />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700">이야기</label>
                <Textarea name="story" placeholder="작품에 담긴 이야기를 입력하세요" />
              </div>
              <div>
                <label className="text-sm text-gray-700">메시지</label>
                <Input name="message" placeholder="토퍼에 새겨진 메시지" />
              </div>
              <div>
                <label className="text-sm text-gray-700">감정</label>
                <Input name="emotion" placeholder="담긴 감정 (예: 사랑과 희망)" />
              </div>
              <div>
                <label className="text-sm text-gray-700">이미지 URL</label>
                <div className="flex gap-2 items-start">
                  <Input
                    ref={imageUrlRef}
                    name="image"
                    placeholder="업로드하면 경로가 자동 입력됩니다"
                    disabled={uploading}
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={async (ev) => {
                        const file = ev.target.files?.[0];
                        if (!file) return;
                        // basic validation (<= 10MB)
                        if (file.size > 10 * 1024 * 1024) {
                          toast.error('파일 용량은 10MB 이하만 가능합니다.');
                          ev.currentTarget.value = '';
                          return;
                        }
                        setPreview(URL.createObjectURL(file));
                        setUploading(true);
                        try {
                          const fd = new FormData();
                          fd.append('file', file);
                          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                          if (!res.ok) throw new Error('업로드 실패');
                          const data = await res.json();
                          if (typeof data?.path === 'string') {
                            setImagePath(data.path);
                          }
                          toast.success('업로드 완료');
                        } catch (err: any) {
                          toast.error(err?.message || '업로드 실패');
                        } finally {
                          setUploading(false);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }
                      }}
                    />
                    <span className="whitespace-nowrap">파일 업로드</span>
                  </label>
                </div>
                {uploading && <p className="text-xs text-gray-500 mt-1">업로드 중...</p>}
                {preview && (
                  <div className="mt-2">
                    <img src={preview} alt="미리보기" className="h-28 w-auto rounded border border-gray-200" />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">취소</Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">추가</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="text-gray-500">불러오는 중...</p>}
        {!loading && items.map((item) => (
          <Card key={item.id} className="group">
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src={item.image || ''}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye size={12} />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Edit size={12} />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={async () => {
                    if (!confirm('삭제하시겠습니까?')) return;
                    try {
                      const res = await fetch(`/api/admin/portfolio/${item.id}`, { method: 'DELETE' });
                      if (!res.ok) throw new Error('삭제 실패');
                      toast.success('삭제되었습니다');
                      await load();
                    } catch (e: any) {
                      toast.error(e?.message || '삭제 실패');
                    }
                  }}>
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg text-gray-800">{item.title}</h3>
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.story}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
