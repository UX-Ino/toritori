import { useState } from 'react';
import { Eye, EyeOff, LogIn, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean | Promise<boolean>;
  onExit: () => void;
}

export function AdminLogin({ onLogin, onExit }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 로딩 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = await onLogin(username, password);
    
    if (!success) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-25 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Exit Button */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={onExit}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
            메인으로 돌아가기
          </Button>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mb-4">
              <h1 className="text-2xl text-amber-800 mb-2">토리토리</h1>
              <p className="text-amber-600 text-sm">Toritori Admin</p>
            </div>
            <h2 className="text-xl text-gray-800">관리자 로그인</h2>
            <p className="text-gray-600 text-sm">관리자 계정으로 로그인해주세요</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">아이디</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="관리자 아이디를 입력하세요"
                  required
                  className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">비밀번호</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required
                    className="border-gray-200 focus:border-amber-400 focus:ring-amber-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>로그인 중...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn size={16} />
                    <span>로그인</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                개발용 계정: admin / toritori2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
