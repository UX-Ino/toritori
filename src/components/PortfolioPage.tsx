"use client";
import { useEffect, useState } from 'react';
import { Filter, Heart, BookOpen, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Skeleton } from './ui/skeleton';


interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [storyItems, setStoryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from Notion-backed API and hydrate categories + items
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/portfolio', { cache: 'no-store' });
        if (!res.ok) {
          // Try to surface server error details from the API route
          let message = '포트폴리오 데이터를 불러오지 못했습니다.';
          try {
            const err = await res.json();
            message = err?.details || err?.error || message;
          } catch {}
          throw new Error(message);
        }
        const data = await res.json();
        if (cancelled) return;
        setStoryItems(Array.isArray(data?.items) ? data.items : []);
        setCategories(Array.isArray(data?.categories) && data.categories.length ? data.categories : ['전체']);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || '알 수 없는 오류가 발생했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/portfolio', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
      if (!res.ok) {
        let message = '포트폴리오 데이터를 불러오지 못했습니다.';
        try {
          const err = await res.json();
          message = err?.details || err?.error || message;
        } catch {}
        throw new Error(message);
      }
      const data = await res.json();
      setStoryItems(Array.isArray(data?.items) ? data.items : []);
      setCategories(Array.isArray(data?.categories) && data.categories.length ? data.categories : ['전체']);
    } catch (e: any) {
      setError(e?.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeFilter === '전체' 
    ? storyItems 
    : storyItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl text-amber-800 mb-6">
            이야기가 담긴 작품들
          </h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto leading-relaxed">
            각각의 토퍼에는 고객님들의 소중한 이야기와 감정이 담겨있습니다
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-600">이야기 종류별 보기</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">총 {filteredItems.length}개의 이야기</p>
              <Button variant="outline" size="sm" onClick={reload} className="border-amber-200 text-amber-700 hover:bg-amber-50">
                새로고침
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={activeFilter === category 
                  ? "bg-amber-600 hover:bg-amber-700 text-white" 
                  : "border-amber-200 text-amber-700 hover:bg-amber-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading && (
              <>
                {[...Array(4)].map((_, i) => (
                  <Card key={`skeleton-${i}`} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="relative">
                        <Skeleton className="h-64 w-full" />
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="col-span-1 lg:col-span-2 text-center text-gray-500 py-12">
                {error ? error : '표시할 이야기가 없습니다.'}
              </div>
            )}

            {!loading && filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden ">
                    <ImageWithFallback 
                      src={item.image || ''}
                      alt={item.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-amber-700">
                        {item.category}
                      </Badge>
                    </div>
             
                  </div>
                  
                  {/* Story Content */}
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <BookOpen size={16} className="text-amber-600" />
                        <h3 className="text-xl text-gray-800 group-hover:text-amber-700 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.story}
                      </p>
                      
                      <div className="bg-amber-50 border-l-4 border-amber-300 p-3 mb-4">
                        <p className="text-amber-800 text-sm italic">
                          "{item.message}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {item.emotion}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={12} />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Impact */}
      <section className="py-16 bg-amber-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-800 mb-4">이야기가 만드는 변화</h2>
            <p className="text-gray-600">작은 토퍼가 전하는 큰 감동</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-3xl text-amber-600 mb-2">500+</p>
                <p className="text-gray-600">담아낸 이야기</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-3xl text-amber-600 mb-2">98%</p>
                <p className="text-gray-600">감동받은 고객</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-3xl text-amber-600 mb-2">∞</p>
                <p className="text-gray-600">전해진 사랑</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-3xl text-amber-600 mb-2">100%</p>
                <p className="text-gray-600">진심을 담아</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl text-gray-700 italic mb-6">
            "작은 토퍼 하나에도<br />
            이렇게 큰 이야기가 담길 수 있구나"
          </blockquote>
          <p className="text-amber-600">— 토리토리를 경험한 모든 고객님들</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            당신의 이야기를 들려주세요
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            소중한 순간을 특별한 토퍼로 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              나의 이야기 시작하기
            </Button>
            <Button 
              onClick={() => onNavigate('order')}
              size="lg"
              variant="outline"
              className="border-white text-amber-50 hover:bg-white hover:bg-amber-50"
            >
              주문 과정 알아보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
