import { ArrowRight, Star, Heart, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const storyHighlights = [
    {
      image: "https://images.unsplash.com/photo-1753742731319-70f5c9908b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwdG9wcGVyJTIwYmlydGhkYXklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTgyNDk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "첫 번째 생일",
      story: "엄마의 마음을 담아 만든 첫돌 토퍼",
      category: "생일"
    },
    {
      image: "https://images.unsplash.com/photo-1653936639896-be9d0aaf1c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnQlMjB0b3BwZXJ8ZW58MXx8fHwxNzU4MjQ5OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "영원한 약속",
      story: "두 사람의 이름이 하나로 이어지는 순간",
      category: "웨딩"
    },
    {
      image: "https://images.unsplash.com/photo-1594150278354-25ed522676ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2hvd2VyJTIwY2FrZSUyMGRlY29yYXRpb25zfGVufDF8fHx8MTc1ODI0OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "새 생명의 축복",
      story: "곧 만날 아기를 위한 따뜻한 마음",
      category: "베이비"
    },
    {
      image: "https://images.unsplash.com/photo-1733515371242-2c7f8255fde6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9uJTIwY2FrZXxlbnwxfHx8fDE3NTgyNDk5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "소중한 기념일",
      story: "함께한 시간을 기억하는 특별한 방법",
      category: "기념일"
    }
  ];

  const testimonials = [
    {
      name: "김○○님",
      content: "작은 토퍼 하나에 이렇게 큰 감동이 담길 수 있다니... 우리 아이 첫돌이 더욱 특별해졌어요.",
      story: "딸의 첫돌 토퍼"
    },
    {
      name: "이○○님", 
      content: "결혼 3주년을 맞아 주문했는데, 우리의 이야기가 이렇게 아름답게 표현될 줄 몰랐어요.",
      story: "3주년 기념 토퍼"
    },
    {
      name: "박○○님",
      content: "단순한 장식이 아니라 우리 가족의 스토리가 담긴 보물이 되었습니다.",
      story: "가족 기념 토퍼"
    }
  ];

  const brandValues = [
    {
      icon: Heart,
      title: "진심을 담다",
      description: "고객님의 소중한 이야기를 듣고, 그 마음을 토퍼에 온전히 담아냅니다."
    },
    {
      icon: BookOpen,
      title: "이야기를 새기다",
      description: "단순한 장식이 아닌, 당신만의 특별한 스토리를 새긴 의미있는 작품을 만듭니다."
    },
    {
      icon: Sparkles,
      title: "순간을 빛내다",
      description: "작은 토퍼 하나로 특별한 날을 더욱 빛나게 하는 마법을 선사합니다."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-25 to-orange-50">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1748016276685-b35708083f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeXRlbGxpbmclMjBtZW1vcnklMjBrZWVwc2FrZXxlbnwxfHx8fDE3NTgyNTg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Storytelling memories"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl text-amber-800 mb-6">
            작은 토퍼에 담긴,<br />큰 이야기들
          </h1>
          <p className="text-xl md:text-2xl text-amber-600 mb-4">
            토리토리 Toritori
          </p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            당신의 소중한 순간과 특별한 이야기를 아름다운 토퍼로 만들어드립니다. 
            작은 장식 하나에도 깊은 의미와 따뜻한 마음을 담아, 
            평생 기억될 순간을 만들어갑니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('portfolio')}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
            >
              작품 이야기 보기
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => onNavigate('contact')}
              variant="outline"
              size="lg"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              나의 이야기 시작하기
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">
              토리토리가 믿는 것
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              모든 사람에게는 특별한 이야기가 있습니다. 
              그 이야기를 소중히 여기고, 아름답게 표현하는 것이 우리의 사명입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <value.icon className="text-amber-600" size={28} />
                  </div>
                  <h3 className="text-xl text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Highlights */}
      <section className="py-20 bg-amber-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">이야기가 담긴 작품들</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              각각의 토퍼에는 고객님들의 특별한 순간과 소중한 마음이 담겨있습니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {storyHighlights.map((item, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs">{item.story}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-800">{item.title}</h3>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.story}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => onNavigate('portfolio')}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              더 많은 이야기 보기
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-gray-800 mb-6">
                이야기를 담는 과정
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 mb-2">이야기 나누기</h3>
                    <p className="text-gray-600">
                      고객님의 특별한 순간과 담고 싶은 의미를 자세히 들어봅니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 mb-2">마음 이해하기</h3>
                    <p className="text-gray-600">
                      전달하고자 하는 감정과 메시지를 깊이 이해한 후 디자인으로 표현합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 mb-2">정성스럽게 제작</h3>
                    <p className="text-gray-600">
                      하나하나 손으로 정성껏 만들어 세상에 하나뿐인 토퍼를 완성합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 mb-2">감동 전달하기</h3>
                    <p className="text-gray-600">
                      완성된 토퍼와 함께 그 안에 담긴 의미와 사랑을 전해드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1568041799811-58a50b955ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd3JpdHRlbiUyMHN0b3J5JTIwbGV0dGVyfGVufDF8fHx8MTc1ODI1ODc2OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Handwritten story"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-lg">
                <p className="text-2xl font-semibold">100%</p>
                <p className="text-sm">수작업 제작</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-20 bg-amber-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">고객님들의 이야기</h2>
            <p className="text-gray-600">토리토리와 함께한 특별한 순간들</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">"{review.content}"</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-800">{review.name}</p>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      {review.story}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            당신만의 이야기를 들려주세요
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
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => onNavigate('about')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              토리토리 이야기 보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}