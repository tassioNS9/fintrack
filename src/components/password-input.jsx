import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { EyeIcon, EyeClosed } from 'lucide-react';

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        id="password"
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
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
  );
};

export default PasswordInput;
