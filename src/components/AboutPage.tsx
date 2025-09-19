import { Heart, BookOpen, Users, Sparkles, Star, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const milestones = [
    {
      year: "2022",
      title: "토리토리의 시작",
      description: "첫 번째 토퍼에 담긴 고객님의 감동을 보며 우리의 사명을 발견했습니다."
    },
    {
      year: "2023",
      title: "이야기 수집가",
      description: "100개의 서로 다른 이야기를 토퍼에 담으며 각각의 특별함을 깨달았습니다."
    },
    {
      year: "2024",
      title: "감동의 확산",
      description: "500개가 넘는 이야기들이 더 많은 사람들에게 감동을 전하고 있습니다."
    }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "진심을 담다",
      description: "고객님의 마음을 온전히 이해하고, 그 진심을 토퍼에 정성스럽게 담아냅니다. 단순한 제작이 아닌, 마음과 마음이 만나는 과정을 소중히 여깁니다."
    },
    {
      icon: BookOpen,
      title: "이야기를 새기다",
      description: "모든 사람에게는 특별한 이야기가 있습니다. 그 이야기를 듣고, 이해하고, 아름다운 형태로 새겨서 영원히 기억될 수 있도록 합니다."
    },
    {
      icon: Sparkles,
      title: "순간을 빛내다",
      description: "작은 토퍼 하나가 만들어내는 큰 변화를 믿습니다. 평범한 순간을 특별하게, 특별한 순간을 더욱 빛나게 만드는 마법을 선사합니다."
    },
    {
      icon: Users,
      title: "연결을 만들다",
      description: "토퍼를 통해 사람과 사람 사이의 깊은 연결고리를 만듭니다. 사랑하는 사람들과의 소중한 추억이 더욱 의미있게 전해지도록 돕습니다."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl text-amber-800 mb-6">
              토리토리의 이야기
            </h1>
            <p className="text-xl text-amber-600 max-w-3xl mx-auto leading-relaxed">
              작은 토퍼에 큰 이야기를 담는다는 것의 의미와 
              우리가 걸어온 길을 소개합니다
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-800">
                토리토리가 시작된 이야기
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  2022년 어느 봄날, 친구의 결혼식을 준비하면서 만든 첫 번째 토퍼가 
                  토리토리의 시작이었습니다. 그 작은 장식 하나가 만들어낸 감동의 순간을 보며, 
                  우리는 깨달았습니다.
                </p>
                <p>
                  "작은 것에도 큰 이야기가 담길 수 있구나."
                </p>
                <p>
                  그 이후로 우리는 고객님 한 분 한 분의 이야기를 정성스럽게 듣고, 
                  그 안에 담긴 사랑과 추억을 아름다운 토퍼로 표현해왔습니다. 
                  생일, 결혼, 기념일... 인생의 소중한 순간마다 함께하며 
                  수많은 감동의 순간들을 만들어왔습니다.
                </p>
                <p>
                  토리토리는 단순히 토퍼를 만드는 브랜드가 아닙니다. 
                  우리는 <strong className="text-amber-700">이야기 수집가이자, 감동의 전달자</strong>입니다.
                </p>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1721654867158-be2b33f174bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGRldGFpbHMlMjBiaWclMjBtb21lbnRzfGVufDF8fHx8MTc1ODI1ODc3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Small details, big moments"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-lg">
                <p className="text-2xl font-semibold">500+</p>
                <p className="text-sm">이야기가 담긴 토퍼</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">
              토리토리가 소중히 여기는 가치
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              우리의 모든 행동과 결정의 기준이 되는 네 가지 핵심 가치입니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                      <value.icon className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-800 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">
              토리토리의 약속
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              고객님께 드리는 우리의 약속입니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">진심으로 듣겠습니다</h3>
                <p className="text-gray-600 leading-relaxed">
                  고객님의 이야기를 진심으로 듣고, 그 안에 담긴 
                  소중한 마음을 이해하기 위해 최선을 다하겠습니다.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">최고의 품질로 만들겠습니다</h3>
                <p className="text-gray-600 leading-relaxed">
                  안전하고 품질 좋은 소재만을 사용하여, 
                  정성과 기술을 다해 완벽한 토퍼를 제작하겠습니다.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">감동을 전달하겠습니다</h3>
                <p className="text-gray-600 leading-relaxed">
                  단순한 장식이 아닌, 특별한 순간을 더욱 빛내고 
                  평생 기억될 감동을 선사하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maker Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">
              토리토리를 만드는 사람
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-25 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="w-32 h-32 bg-amber-100 rounded-full mx-auto md:mx-0 mb-4 flex items-center justify-center">
                      <span className="text-3xl text-amber-600">👩‍🎨</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl text-gray-800 mb-2">박선미 대표</h3>
                      <p className="text-amber-600 mb-4">이야기 수집가 & 토퍼 아티스트</p>
                    </div>
                    
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                      <p>
                        안녕하세요, 토리토리의 박선미입니다.
                        저는 사람들의 이야기를 듣는 것을 가장 좋아합니다.
                        특히 그 안에 담긴 사랑과 추억을 발견할 때면 마음이 설렙니다.
                      </p>
                      <p>
                        "모든 사람에게는 특별한 이야기가 있다"는 믿음으로 
                        지난 2년간 500개가 넘는 이야기를 토퍼에 담아왔습니다. 
                        그 과정에서 저 역시 많은 감동을 받았고, 성장할 수 있었습니다.
                      </p>
                      <p>
                        작은 토퍼 하나가 만들어내는 큰 변화와 감동. 
                        그것이 제가 이 일을 계속하는 이유입니다.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-4">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">UX 전공</span>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">이야기 수집가</span>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">감동 전달자</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-4">숫자로 보는 토리토리</h2>
            <p className="text-amber-100">우리가 함께 만들어온 의미있는 숫자들</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <p className="text-4xl font-semibold mb-2">500+</p>
              <p className="text-amber-100">담아낸 이야기</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-semibold mb-2">98%</p>
              <p className="text-amber-100">고객 만족도</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-semibold mb-2">지금부터+</p>
              <p className="text-amber-100">감동의 여정</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-semibold mb-2">∞</p>
              <p className="text-amber-100">전해진 사랑</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}