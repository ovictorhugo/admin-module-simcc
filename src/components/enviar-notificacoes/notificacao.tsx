// src/emails/NotificationEmail.jsx
import React from 'react';
import { Tailwind } from '@react-email/tailwind';
import { Html, Body, Container, Heading, Text, Link, Button } from '@react-email/components';

import img_1 from '../../assets/logo_email_1.png';
import img_2 from '../../assets/logo_email_2.png';
import img_3 from '../../assets/logo_email_3.png';
import img_4 from '../../assets/bg_home.png';

export function NotificationEmail({ titulo, subTitulo, texto, link }) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 p-4">
          <Container className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${img_4})` }}
            ></div>
            <div className="bg-blue-600 p-8 text-center">
              <img src={img_1} alt="Logo" className="h-16 mx-auto" />
            </div>
            <div className="p-8">
              <Heading className="text-3xl font-bold">{titulo || 'Insira o título'}</Heading>
              <Text className="text-gray-500 mt-4">{subTitulo || 'Insira o subtítulo'}</Text>
              <Text className="text-gray-700 mt-8">{texto || 'Insira o corpo da mensagem'}</Text>
              <div className="mt-8">
                <Link href={link} className="inline-block">
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Ir à página
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-4 bg-gray-50 text-center text-xs text-gray-500">
              <Text>
                Você está recebendo este e-mail porque está inscrito na Newsletter do{' '}
                <Link href="https://conectee.eng.ufmg.br/" className="text-blue-500">
                  Conectee
                </Link>{' '}
                |{' '}
                <Link href="https://www.eng.ufmg.br/" className="text-blue-500">
                  Escola de Engenharia
                </Link>
              </Text>
              <div className="flex justify-center mt-4 space-x-4">
                <img src={img_3} alt="Logo" className="h-8" />
                <img src={img_2} alt="Logo" className="h-8" />
              </div>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
