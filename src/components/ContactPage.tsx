"use client";
import { useState } from 'react';
import { Phone, Mail, MessageCircle, Instagram, Clock, MapPin, Send, Heart, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    storyType: '',
    desiredDate: '',
    story: '',
    message: '',
    feeling: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('소중한 이야기를 들려주셔서 감사합니다! 24시간 내 연락드리겠습니다.');
    console.log('Story submitted:', formData);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "카카오톡 채널",
      subtitle: "@토리토리",
      description: "가장 빠른 이야기 나눔",
      action: "카톡으로 이야기하기",
      color: "bg-yellow-500"
    },
    {
      icon: Instagram,
      title: "인스타그램 DM",
      subtitle: "@toritori_story",
      description: "작품과 함께 상담",
      action: "DM으로 시작하기",
      color: "bg-pink-500"
    },
    {
      icon: Phone,
      title: "전화 상담",
      subtitle: "010-1234-5678",
      description: "직접 대화로 이야기 나눔",
      action: "전화하기",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "이메일",
      subtitle: "hello@toritori.com",
      description: "자세한 이야기 전달",
      action: "메일 보내기",
      color: "bg-blue-500"
    }
  ];

  const businessHours = [
    { day: "월-금", time: "10:00 - 18:00", available: true },
    { day: "토요일 - 일요일", time: "휴무 (메시지 확인)", available: false },
  ];

  const storyTypes = [
    { value: "birthday", label: "생일 축하", icon: "🎂" },
    { value: "wedding", label: "결혼 축하", icon: "💍" },
    { value: "anniversary", label: "기념일", icon: "💕" },
    { value: "baby", label: "베이비 샤워/첫돌", icon: "👶" },
    { value: "family", label: "가족 모임", icon: "👨‍👩‍👧‍👦" },
    { value: "graduation", label: "졸업/취업", icon: "🎓" },
    { value: "special", label: "특별한 순간", icon: "✨" },
    { value: "other", label: "기타", icon: "💝" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl text-amber-800 mb-6">
            이야기를 시작해보세요
          </h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto leading-relaxed">
            당신의 소중한 이야기를 들려주세요. 
            그 마음을 아름다운 토퍼로 만들어드립니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Story Form */}
          <div>
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="text-amber-600" size={24} />
                <h2 className="text-3xl text-gray-800">당신의 이야기를 들려주세요</h2>
              </div>
              <p className="text-gray-600">
                어떤 이야기든 좋습니다. 작은 일상의 감사부터 인생의 큰 순간까지, 
                당신이 소중히 여기는 모든 이야기를 환영합니다.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-700 flex items-center space-x-2">
                  <Heart size={20} />
                  <span>이야기 나눔 양식</span>
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  진심을 담아 작성해주시면, 그 마음을 토퍼에 담아드리겠습니다.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className='mb-2' htmlFor="name">성함 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="이름을 알려주세요"
                        required
                      />
                    </div>
                    <div>
                      <Label className='mb-2' htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2' htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="example@email.com (선택사항)"
                    />
                  </div>

                  {/* Story Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className='mb-2' htmlFor="storyType">이야기 종류</Label>
                      <Select onValueChange={(value) => handleInputChange('storyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="어떤 이야기인가요?" />
                        </SelectTrigger>
                        <SelectContent>
                          {storyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.icon} {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className='mb-2' htmlFor="desiredDate">언제 필요하신가요? *</Label>
                      <Input
                        id="desiredDate"
                        type="date"
                        value={formData.desiredDate}
                        onChange={(e) => handleInputChange('desiredDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2' htmlFor="story">이야기를 들려주세요 *</Label>
                    <Textarea
                      id="story"
                      value={formData.story}
                      onChange={(e) => handleInputChange('story', e.target.value)}
                      placeholder="어떤 특별한 순간인가요? 누구를 위한 것인가요? 어떤 마음을 전하고 싶으신가요? 자유롭게 이야기해주세요."
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label className='mb-2' htmlFor="feeling">전하고 싶은 감정</Label>
                    <Input
                      id="feeling"
                      value={formData.feeling}
                      onChange={(e) => handleInputChange('feeling', e.target.value)}
                      placeholder="예: 사랑, 감사, 축하, 응원, 그리움 등"
                    />
                  </div>

                  <div>
                    <Label className='mb-2' htmlFor="message">토퍼에 들어갈 문구나 추가 요청사항</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="토퍼에 넣고 싶은 문구나 특별한 요청사항이 있으시면 적어주세요"
                      rows={3}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                      <Send className="mr-2" size={16} />
                      이야기 전하기
                    </Button>
                  </div>
                </form>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    이야기를 보내주시면 <span className="text-amber-600 font-medium">24시간 내</span> 연락드려<br />
                    더 자세한 상담을 진행하겠습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Methods */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="text-amber-600" size={24} />
                <h2 className="text-3xl text-gray-800">다른 방법으로 연결하기</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${method.color}`}>
                          <method.icon className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-800 mb-1">{method.title}</h3>
                          <p className="text-amber-600 text-sm mb-1">{method.subtitle}</p>
                          <p className="text-gray-500 text-xs mb-2">{method.description}</p>
                          <Button size="sm" variant="outline" className="text-xs">
                            {method.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="text-amber-600" size={20} />
                  <span>이야기 나눔 시간</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{schedule.day}</span>
                      <span className={`${schedule.available ? 'text-gray-600' : 'text-gray-400'}`}>
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <ul className="text-sm text-amber-700 space-y-2">
                    <li>💝 언제든 메시지를 보내주세요.</li>
                    <li>상담 시간 외에도 이야기를 받고 있으며, 다음 영업일에 정성스럽게 답변드립니다.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Story Tips */}
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-25 border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-lg text-amber-800 mb-3 flex items-center space-x-2">
                  <Heart size={20} />
                  <span>좋은 이야기 나눔을 위한 팁</span>
                </h3>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• 특별한 이유나 배경이 있다면 자세히 알려주세요</li>
                  <li>• 전하고 싶은 감정이나 메시지를 구체적으로 설명해주세요</li>
                  <li>• 좋아하는 색상이나 스타일이 있으면 언급해주세요</li>
                  <li>• 토퍼가 사용될 케이크나 공간의 크기를 알려주세요</li>
                  <li>• 참고하고 싶은 이미지가 있다면 함께 보내주세요</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Closing Message */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-white mb-4">
            모든 이야기는 소중합니다
          </h2>
          <p className="text-amber-100 mb-6 text-lg leading-relaxed">
            크든 작든, 특별하든 평범하든, 당신이 소중히 여기는 이야기라면<br />
            토리토리가 정성스럽게 들어드리겠습니다.
          </p>
          <p className="text-amber-200 text-sm">
            "작은 토퍼에 담긴, 큰 이야기들"
          </p>
        </div>
      </section>
    </div>
  );
}
