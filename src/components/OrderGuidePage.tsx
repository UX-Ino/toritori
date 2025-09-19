import { MessageCircle, Clock, Truck, CreditCard, HelpCircle, CheckCircle, Heart, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface OrderGuidePageProps {
  onNavigate: (page: string) => void;
}

export function OrderGuidePage({ onNavigate }: OrderGuidePageProps) {
  const orderSteps = [
    {
      step: "01",
      title: "이야기 나누기",
      description: "당신의 특별한 이야기와 토퍼에 담고 싶은 마음을 들려주세요.",
      icon: MessageCircle,
      timeframe: "언제든지",
      details: "카카오톡, 문의양식, 전화 등 편한 방법으로 연락해주시면 됩니다."
    },
    {
      step: "02", 
      title: "마음 이해하기",
      description: "고객님의 이야기를 깊이 이해하고 맞춤 시안을 제작해드립니다.",
      icon: Heart,
      timeframe: "1-2일",
      details: "이야기에 담긴 감정과 의미를 파악하여 최적의 디자인을 제안합니다."
    },
    {
      step: "03",
      title: "디자인 확정",
      description: "시안을 확인하시고 만족하시면 최종 디자인을 확정합니다.",
      icon: CheckCircle,
      timeframe: "즉시",
      details: "2회까지 무료 수정이 가능하며, 확정 후 결제를 진행합니다."
    },
    {
      step: "04",
      title: "정성스럽게 제작",
      description: "확정된 디자인으로 마음을 담아 토퍼를 제작합니다.",
      icon: BookOpen,
      timeframe: "3-5일",
      details: "100% 수작업으로 정성스럽게 제작하여 품질을 보장합니다."
    },
    {
      step: "05",
      title: "감동 전달",
      description: "완성된 토퍼를 안전하게 포장하여 배송해드립니다.",
      icon: Truck,
      timeframe: "1-2일",
      details: "깨지지 않도록 안전 포장하여 전국 어디든 배송합니다."
    }
  ];

  const pricingOptions = [
    {
      type: "감성 베이직",
      price: "30,000원",
      features: [
        "간단한 텍스트 (15자 이내)",
        "기본 폰트 & 색상",
        "아크릴 소재",
        "표준 사이즈 (12cm 이내)",
        "기본 포장"
      ],
      popular: false,
      bestFor: "첫 주문, 간단한 메시지"
    },
    {
      type: "스토리 프리미엄",
      price: "50,000원",
      features: [
        "텍스트 + 간단한 장식",
        "다양한 폰트 & 색상 조합",
        "고급 아크릴 + 특수 효과",
        "대형 사이즈 (18cm 이내)",
        "선물용 고급 포장"
      ],
      popular: true,
      bestFor: "특별한 기념일, 선물용"
    },
    {
      type: "맞춤 스페셜",
      price: "견적 문의",
      features: [
        "완전 맞춤 디자인",
        "복잡한 형태 & 문구",
        "다양한 소재 선택",
        "원하는 사이즈",
        "프리미엄 포장 + 카드"
      ],
      popular: false,
      bestFor: "특별한 요청, 기업 행사"
    }
  ];

  const faqs = [
    {
      question: "어떤 이야기든 토퍼에 담을 수 있나요?",
      answer: "네, 어떤 이야기든 환영합니다! 생일, 결혼, 기념일은 물론 일상의 소소한 감사나 응원의 메시지까지 모든 이야기를 아름답게 표현해드립니다. 고객님의 마음이 담긴 이야기라면 무엇이든 가능합니다."
    },
    {
      question: "제작 기간은 얼마나 걸리나요?",
      answer: "이야기 나눔부터 완성까지 보통 5-7일 정도 소요됩니다. 시안 제작에 1-2일, 토퍼 제작에 3-5일이 걸립니다. 급하신 경우 별도 상담을 통해 특급 제작도 가능합니다."
    },
    {
      question: "어떤 소재로 만들어지나요?",
      answer: "주로 식품 안전 기준을 만족하는 고급 아크릴 소재를 사용합니다. 안전하고 내구성이 뛰어나며 색상 표현이 선명합니다. 특별한 요청이 있으시면 다른 소재도 가능합니다."
    },
    {
      question: "시안 수정이 가능한가요?",
      answer: "물론입니다! 시안 단계에서 2회까지 무료로 수정 가능합니다. 고객님이 100% 만족하실 때까지 최선을 다해 디자인을 조정해드립니다. 추가 수정이 필요한 경우 별도 상담합니다."
    },
    {
      question: "배송은 어떻게 이루어지나요?",
      answer: "전국 택배 배송이 기본이며, 안전한 포장으로 2-3일 내 배송됩니다. 서울/경기 지역은 당일 퀵 배송도 가능합니다(별도 비용). 소중한 토퍼가 안전하게 도착할 수 있도록 세심하게 포장합니다."
    },
    {
      question: "가격은 어떻게 결정되나요?",
      answer: "토퍼의 크기, 복잡도, 사용 소재에 따라 결정됩니다. 기본형 30,000원부터 시작하며, 대부분의 고객님은 프리미엄(50,000원)을 선택하십니다. 정확한 견적은 이야기를 나눈 후 안내드립니다."
    },
    {
      question: "결제는 언제 하나요?",
      answer: "시안을 확인하고 최종 승인하신 후 결제를 진행합니다. 50% 선입금 후 제작을 시작하며, 나머지 50%는 완성품 사진 확인 후 결제하시면 됩니다. 계좌이체 또는 카드결제 가능합니다."
    },
    {
      question: "직접 방문해서 상담할 수 있나요?",
      answer: "네, 가능합니다! 서울 강남구에 위치한 작업실에서 직접 상담받으실 수 있습니다. 실제 토퍼 샘플도 보실 수 있어 더욱 자세한 상담이 가능합니다. 방문 전 미리 예약해주세요."
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl text-amber-800 mb-6">
            이야기를 토퍼로 만드는 과정
          </h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto leading-relaxed">
            당신의 소중한 이야기가 아름다운 토퍼로 탄생하는 특별한 여정을 안내해드립니다
          </p>
        </div>
      </section>

      {/* Order Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">5단계로 완성되는 나만의 토퍼</h2>
            <p className="text-gray-600">이야기에서 감동까지, 모든 과정을 세심하게 진행합니다</p>
          </div>
          
          <div className="space-y-8">
            {orderSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    <div className="text-center md:text-left">
                      <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                        <step.icon className="text-amber-600" size={24} />
                      </div>
                      <div className="bg-amber-600 text-white text-sm px-3 py-1 rounded-full inline-block">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-xl text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                    
                    <div className="text-center">
                      <Badge variant="outline" className="text-amber-600 border-amber-200">
                        {step.timeframe}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-amber-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">투명하고 합리적인 가격</h2>
            <p className="text-gray-600">이야기의 가치에 맞는 공정한 가격 정책</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <Card key={index} className={`relative ${option.popular ? 'ring-2 ring-amber-300 shadow-lg' : ''}`}>
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-amber-600 text-white">인기</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-gray-800">{option.type}</CardTitle>
                  <p className="text-3xl text-amber-600 mt-2">{option.price}</p>
                  <p className="text-sm text-gray-500">{option.bestFor}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle size={16} className="text-amber-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${option.popular ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    onClick={() => onNavigate('contact')}
                  >
                    이 옵션으로 시작하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              * 배송비: 전국 3,000원 (5만원 이상 무료) / 당일 퀵배송: 서울/경기 15,000원
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">토리토리가 특별한 이유</h2>
            <p className="text-gray-600">단순한 토퍼 제작을 넘어서는 특별한 경험</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">이야기에 집중</h3>
                <p className="text-gray-600 leading-relaxed">
                  단순한 주문이 아닌, 고객님의 이야기를 깊이 이해하고 
                  그 감정을 토퍼에 온전히 담아냅니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">100% 맞춤 제작</h3>
                <p className="text-gray-600 leading-relaxed">
                  템플릿이 아닌, 오직 고객님만을 위한 
                  완전히 새로운 디자인을 제작합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="text-amber-600" size={28} />
                </div>
                <h3 className="text-xl text-gray-800 mb-4">품질 보장</h3>
                <p className="text-gray-600 leading-relaxed">
                  안전한 소재와 정교한 수작업으로 
                  오래도록 간직할 수 있는 품질을 보장합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-amber-25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-gray-800 mb-4">자주 묻는 질문</h2>
            <p className="text-gray-600">궁금한 점들을 미리 확인해보세요</p>
          </div>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <HelpCircle size={18} className="text-amber-600 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed pl-7">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            당신의 이야기를 들려주세요
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            소중한 순간을 특별한 토퍼로 만드는 여정을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('contact')}
              size="lg"
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              이야기 시작하기
            </Button>
            <Button 
              onClick={() => onNavigate('portfolio')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              다른 이야기들 보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}