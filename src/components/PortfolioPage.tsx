"use client";
import { useState } from 'react';
import { Filter, Heart, BookOpen, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('전체');

  const categories = ['전체', '생일', '웨딩', '기념일', '베이비', '가족', '특별한 순간'];

  const storyItems = [
    {
      id: 1,
      title: "첫 번째 생일",
      category: "생일",
      image: "https://images.unsplash.com/photo-1753742731319-70f5c9908b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwdG9wcGVyJTIwYmlydGhkYXklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTgyNDk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "엄마가 품에서 키운 아이가 처음으로 맞는 생일. 한 글자 한 글자에 엄마의 사랑과 바람을 담아 만든 특별한 토퍼입니다.",
      emotion: "사랑과 희망",
      message: "우리 아기의 첫 번째 생일을 축하해"
    },
    {
      id: 2,
      title: "영원한 약속",
      category: "웨딩",
      image: "https://images.unsplash.com/photo-1653936639896-be9d0aaf1c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnQlMjB0b3BwZXJ8ZW58MXx8fHwxNzU4MjQ5OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "7년의 연애 끝에 결혼을 앞둔 커플. 두 사람의 이름이 하나로 이어지는 순간을 영원히 기억하고 싶다는 마음을 담았습니다.",
      emotion: "영원한 사랑",
      message: "지수 ♥ 민호, Forever"
    },
    {
      id: 3,
      title: "새 생명의 축복",
      category: "베이비",
      image: "https://images.unsplash.com/photo-1594150278354-25ed522676ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2hvd2VyJTIwY2FrZSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1ODI0OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      story: "곧 태어날 아기를 위한 베이비 샤워 파티. 가족과 친구들의 축복과 기대를 담아 따뜻한 마음으로 준비한 토퍼입니다.",
      emotion: "기대와 축복",
      message: "Welcome Baby"
    },
    {
      id: 4,
      title: "소중한 기념일",
      category: "기념일",
      image: "https://images.unsplash.com/photo-1733515371242-2c7f8255fde6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9uJTIwY2FrZXxlbnwxfHx8fDE3NTgyNDk5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "결혼 3주년을 맞은 부부. 첫 만남부터 지금까지의 소중한 추억들을 돌아보며, 앞으로도 함께 걸어갈 다짐을 담았습니다.",
      emotion: "고마움과 약속",
      message: "3년째, 여전히 설레는 우리"
    },
    {
      id: 5,
      title: "할머니의 80번째 생일",
      category: "가족",
      image: "https://images.unsplash.com/photo-1753742731099-028d1a0555fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwdGFibGUlMjBzZXR1cHxlbnwxfHx8fDE3NTgyNDk5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "온 가족이 모여 축하하는 할머니의 팔순잔치. 평생 가족을 위해 헌신하신 할머니에 대한 감사와 사랑을 전하는 토퍼입니다.",
      emotion: "존경과 감사",
      message: "할머니 사랑해요"
    },
    {
      id: 6,
      title: "첫 돌잔치",
      category: "생일",
      image: "https://images.unsplash.com/photo-1649126927007-73d0b082d302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGFydHklMjBkZWNvcmF0aW9ucyUyMHBhc3RlbHxlbnwxfHx8fDE3NTgyNDk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "건강하게 첫 돌를 맞은 아기. 부모님의 간절한 기도와 사랑이 담긴 특별한 날을 기념하는 의미있는 토퍼입니다.",
      emotion: "기쁨과 감사",
      message: "건강하게 자라줘서 고마워"
    },
    {
      id: 7,
      title: "졸업 축하",
      category: "특별한 순간",
      image: "https://images.unsplash.com/photo-1753742731319-70f5c9908b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwdG9wcGVyJTIwYmlydGhkYXklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTgyNDk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "대학 졸업을 앞둔 딸을 위해 부모님이 준비한 깜짝 파티. 힘든 공부를 끝까지 해낸 딸에 대한 자랑스러움을 담았습니다.",
      emotion: "자랑스러움",
      message: "수고했어, 우리 딸"
    },
    {
      id: 8,
      title: "은혼식 축하",
      category: "기념일",
      image: "https://images.unsplash.com/photo-1733515371242-2c7f8255fde6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9uJTIwY2FrZXxlbnwxfHx8fDE3NTgyNDk5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      story: "결혼 25주년을 맞은 부모님을 위해 자녀들이 준비한 은혼식 파티. 변함없는 사랑과 앞으로의 행복을 기원하는 마음을 담았습니다.",
      emotion: "변함없는 사랑",
      message: "25년째 변함없는 사랑"
    },
    {
      id: 9,
      title: "반려동물과의 추억",
      category: "특별한 순간",
      image: "https://images.unsplash.com/photo-1594150278354-25ed522676ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2hvd2VyJTIwY2FrZSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1ODI0OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      story: "15년간 함께한 반려견의 생일을 축하하며, 지금까지의 소중한 추억과 앞으로도 함께할 시간에 대한 감사를 표현했습니다.",
      emotion: "깊은 사랑",
      message: "똘이야, 생일 축하해"
    }
  ];

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
            <p className="text-sm text-gray-500">
              총 {filteredItems.length}개의 이야기
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className={activeFilter === category 
                  ? "bg-amber-600 hover:bg-amber-700" 
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
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <ImageWithFallback 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-amber-700">
                        {item.category}
                      </Badge>
                    </div>
                    <button className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white">
                      <Heart size={16} className="text-amber-600" />
                    </button>
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
              size="lg"
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              나의 이야기 시작하기
            </Button>
            <Button 
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
