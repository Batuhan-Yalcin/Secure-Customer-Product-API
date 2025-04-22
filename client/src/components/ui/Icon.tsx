import React from 'react';
import * as FiIcons from 'react-icons/fi';

interface IconProps {
  name: string;
  className?: string;
}

// İcon bileşeni
const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  // İcon adına göre doğru iconu alıyoruz
  const IconComponent = FiIcons[name as keyof typeof FiIcons];
  
  // Icon bulunamazsa null döndür
  if (!IconComponent) {
    console.warn(`Icon with name "${name}" not found`);
    return null;
  }
  
  // Normal JSX kullanımını deniyoruz
  const IconElement = IconComponent as React.ComponentType<{className?: string}>;
  return <IconElement className={className} />;
};

export default Icon; 