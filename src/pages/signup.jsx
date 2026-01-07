import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { EyeIcon, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const SignupPage = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="min-w-96">
        <CardHeader className="flex items-center">
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" required />
          <Input placeholder="Digite seu Sobrenome" required />
          <Input
            id="email"
            type="email"
            placeholder="Digite seu email"
            required
          />
          <div className="relative">
            <Input
              id="password"
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite sua senha"
              required
            />
            <Button
              onClick={() => setPasswordIsVisible((prev) => !prev)}
              variant="ghost"
              className="absolute bottom-0 right-0 top-0 my-auto mr-2 h-8 w-8 text-muted-foreground"
            >
              {passwordIsVisible ? <EyeIcon /> : <EyeClosed />}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-5 flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta ?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
