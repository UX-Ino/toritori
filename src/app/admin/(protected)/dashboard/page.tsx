import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Image as ImageIcon, MessageCircle, Users, BarChart3 } from 'lucide-react';

export default function AdminDashboardPage() {
  const dashboardStats = {
    totalOrders: 156,
    totalPortfolio: 47,
    totalInquiries: 23,
    totalCustomers: 134,
    monthlyRevenue: 2450000,
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-gray-800">대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 주문</p>
              <p className="text-2xl text-gray-800">{dashboardStats.totalOrders}</p>
            </div>
            <ShoppingBag className="text-amber-600" size={24} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">포트폴리오</p>
              <p className="text-2xl text-gray-800">{dashboardStats.totalPortfolio}</p>
            </div>
            <ImageIcon className="text-amber-600" size={24} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">대기 문의</p>
              <p className="text-2xl text-gray-800">{dashboardStats.totalInquiries}</p>
            </div>
            <MessageCircle className="text-amber-600" size={24} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 고객</p>
              <p className="text-2xl text-gray-800">{dashboardStats.totalCustomers}</p>
            </div>
            <Users className="text-amber-600" size={24} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">월 매출</p>
              <p className="text-2xl text-gray-800">{dashboardStats.monthlyRevenue.toLocaleString()}원</p>
            </div>
            <BarChart3 className="text-amber-600" size={24} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="text-xs text-gray-600">{order.status}</p>
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
                    <p className="text-xs text-gray-600">{inquiry.status}</p>
                    <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

