import { useState } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  MessageCircle, 
  ShoppingBag, 
  Users, 
  BarChart3,
  LogOut,
  Home,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AdminDashboardProps {
  onLogout: () => void | Promise<void>;
  onExit: () => void;
}

export function AdminDashboard({ onLogout, onExit }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const dashboardStats = {
    totalOrders: 156,
    totalPortfolio: 47,
    totalInquiries: 23,
    totalCustomers: 134,
    monthlyRevenue: 2450000,
    customerSatisfaction: 98
  };

  const recentOrders = [
    { id: 1, customer: '김○○', item: '첫돌 케이크 토퍼', status: '제작중', date: '2024-01-15' },
    { id: 2, customer: '이○○', item: '결혼 기념일 토퍼', status: '완료', date: '2024-01-14' },
    { id: 3, customer: '박○○', item: '생일 토퍼', status: '대기', date: '2024-01-13' },
  ];

  const recentInquiries = [
    { id: 1, customer: '정○○', subject: '웨딩 토퍼 제작 문의', status: '답변대기', date: '2024-01-15' },
    { id: 2, customer: '최○○', subject: '배송 일정 문의', status: '답변완료', date: '2024-01-14' },
    { id: 3, customer: '한○○', subject: '맞춤 디자인 가능 여부', status: '답변대기', date: '2024-01-13' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "첫 번째 생일",
      category: "생일",
      image: "https://images.unsplash.com/photo-1753742731319-70f5c9908b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwdG9wcGVyJTIwYmlydGhkYXklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTgyNDk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "엄마가 품에서 키운 아이가 처음으로 맞는 생일...",
      status: "공개",
      date: "2024-01-10"
    },
    {
      id: 2,
      title: "영원한 약속",
      category: "웨딩",
      image: "https://images.unsplash.com/photo-1653936639896-be9d0aaf1c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnQlMjB0b3BwZXJ8ZW58MXx8fHwxNzU4MjQ5OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "7년의 연애 끝에 결혼을 앞둔 커플...",
      status: "공개",
      date: "2024-01-08"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl text-amber-800">토리토리 관리자</h1>
                <p className="text-sm text-gray-600">Toritori Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={onExit}
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <Home size={16} className="mr-2" />
                메인 사이트
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <LayoutDashboard size={18} className="mr-3" />
                  대시보드
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <Image size={18} className="mr-3" />
                  포트폴리오 관리
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <ShoppingBag size={18} className="mr-3" />
                  주문 관리
                </TabsTrigger>
                <TabsTrigger 
                  value="inquiries" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <MessageCircle size={18} className="mr-3" />
                  문의 관리
                </TabsTrigger>
                <TabsTrigger 
                  value="customers" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <Users size={18} className="mr-3" />
                  고객 관리
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700"
                >
                  <BarChart3 size={18} className="mr-3" />
                  통계
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-800 mb-6">대시보드</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">총 주문</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.totalOrders}</p>
                        </div>
                        <ShoppingBag className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">포트폴리오</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.totalPortfolio}</p>
                        </div>
                        <Image className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">대기 문의</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.totalInquiries}</p>
                        </div>
                        <MessageCircle className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">총 고객</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.totalCustomers}</p>
                        </div>
                        <Users className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">월 매출</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.monthlyRevenue.toLocaleString()}원</p>
                        </div>
                        <BarChart3 className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">고객 만족도</p>
                          <p className="text-2xl text-gray-800">{dashboardStats.customerSatisfaction}%</p>
                        </div>
                        <Star className="text-amber-600" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">최근 주문</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-800">{order.customer}</p>
                              <p className="text-xs text-gray-600">{order.item}</p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={order.status === '완료' ? 'default' : 'secondary'}
                                className={order.status === '완료' ? 'bg-green-100 text-green-700' : ''}
                              >
                                {order.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">최근 문의</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentInquiries.map((inquiry) => (
                          <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-800">{inquiry.customer}</p>
                              <p className="text-xs text-gray-600">{inquiry.subject}</p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={inquiry.status === '답변완료' ? 'default' : 'secondary'}
                                className={inquiry.status === '답변완료' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                              >
                                {inquiry.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Portfolio Management */}
            <TabsContent value="portfolio" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-800">포트폴리오 관리</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-amber-600 hover:bg-amber-700 text-white h-9 px-4 rounded-md inline-flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      새 작품 추가
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>새 포트폴리오 작품 추가</DialogTitle>
                      <DialogDescription>
                        작품 정보를 입력하고 이미지를 업로드하세요. 이 다이얼로그는 접근성을 위해 설명을 포함합니다.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-700">작품 제목</label>
                          <Input placeholder="작품 제목을 입력하세요" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-700">카테고리</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="birthday">생일</SelectItem>
                              <SelectItem value="wedding">웨딩</SelectItem>
                              <SelectItem value="anniversary">기념일</SelectItem>
                              <SelectItem value="baby">베이비</SelectItem>
                              <SelectItem value="family">가족</SelectItem>
                              <SelectItem value="special">특별한 순간</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-700">이야기</label>
                        <Textarea placeholder="작품에 담긴 이야기를 입력하세요" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-700">메시지</label>
                        <Input placeholder="토퍼에 새겨진 메시지" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-700">감정</label>
                        <Input placeholder="담긴 감정 (예: 사랑과 희망)" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline">취소</Button>
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700">추가</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <Card key={item.id} className="group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <ImageWithFallback 
                          src={item.image}
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
                          <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg text-gray-800">{item.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.story}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{item.date}</span>
                          <Badge variant={item.status === '공개' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Orders Management */}
            <TabsContent value="orders">
              <h2 className="text-2xl text-gray-800 mb-6">주문 관리</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">주문 관리 기능이 준비 중입니다.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inquiries Management */}
            <TabsContent value="inquiries">
              <h2 className="text-2xl text-gray-800 mb-6">문의 관리</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">문의 관리 기능이 준비 중입니다.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Management */}
            <TabsContent value="customers">
              <h2 className="text-2xl text-gray-800 mb-6">고객 관리</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">고객 관리 기능이 준비 중입니다.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <h2 className="text-2xl text-gray-800 mb-6">통계</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">통계 기능이 준비 중입니다.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
