import { useTheme } from "next-themes";
import { LogoConectee } from "../components/svg/LogoConectee";
import { LogoConecteeWhite } from "../components/svg/LogoConecteeWhite";


import { useContext } from "react";
import { UserContext } from "../context/context";
import { LogoIaposWhite } from "../components/svg/LogoIaposWhite";
import { LogoIapos } from "../components/svg/LogoIapos";
import bg_popup from '../assets/bg_home.png';
import { FooterHome } from "../components/footer/footer-home";
import { Alert } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { getVersion } from "../gerVersion";
export function TermosUso() {
    const { theme } = useTheme();
    const { version } = useContext(UserContext);

    const institution = version ? "a Escola de Engenharia da UFMG" : "o SECTI-BA";
    const platform = version ? "Conectee" : "Simcc";
      const version2 = getVersion();
    return (
       <div className="md:p-8 p-4 text-gray-500 flex flex-col h-auto items-center bg-neutral-50 dark:bg-neutral-900">
        <div>

        </div>
        <div className="max-w-[936px] w-full">
            <Alert className="rounded-b-none justify-between flex bg-neutral-100 dark:bg-neutral-800 border-b-0 md:py-4 md:px-8">

                <div></div>

                <div>
                   <Link to={'/'}> <Button variant={'outline'} ><Home size={16}/>Página inicial</Button></Link>
                </div>
            </Alert>
        <Alert className="p-0 rounded-t-none">
        
            <div className="p-8 my-8 bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${bg_popup})` }}>
            <h1 className="text-3xl max-w-[500px] font-semibold text-gray-900 dark:text-white mb-8">
            Documentação e termos de uso da Plataforma {platform}
            </h1>
            <div className='flex gap-2 items-center text-sm text-gray-500'>Versão da plataforma: {version2}</div>
            </div>

            <div className="px-8 flex flex-col gap-8 text-justify ">
<p className="text-gray-500">O {platform} um produto da colaboração da Escola de Engenharia da UFMG, Senai CIMATEC, Secretaria de Ciência e Tecnologia do Estado da Bahia,  Universidade do Estado da Bahia e Universidade Estadual de Santa Cruz.</p>
            
            <div className="p-8 bg-eng-blue/30 rounded-md "></div>
            
            <p className="text-gray-500 text-justify dark:text-gray-300 leading-relaxed ">
                Bem-vindo ao <strong>{platform}</strong>, uma iniciativa tecnológica desenvolvida pela{" "}
                <strong>{institution}</strong>, com o compromisso de proporcionar 
                ferramentas de ponta para o gerenciamento, análise e visualização de dados acadêmicos, científicos e 
                institucionais. Este documento descreve os termos e condições de uso da plataforma {platform}, detalhando as 
                responsabilidades dos usuários e as diretrizes que norteiam o funcionamento seguro e eficiente da plataforma.
            </p>

            <p className="text-gray-500 text-justify dark:text-gray-300 leading-relaxed ">
                Ao utilizar o {platform}, você concorda integralmente com os termos aqui descritos. Ressaltamos que 
                este Termo de Uso pode ser revisado periodicamente para refletir mudanças tecnológicas, legais ou 
                institucionais. Recomendamos uma leitura frequente para manter-se informado sobre quaisquer atualizações. 
                A continuidade no uso da plataforma será interpretada como aceitação das alterações realizadas.
            </p>

            
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ">
                1. Objetivo e Abrangência
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed ">
                A plataforma {platform} tem como principal objetivo integrar e centralizar informações acadêmicas, científicas 
                e institucionais, possibilitando uma visão completa e detalhada das produções de pesquisadores e 
                programas de pós-graduação vinculados {institution}. Através de funcionalidades avançadas, a 
                plataforma oferece suporte para tomadas de decisão baseadas em dados confiáveis e atualizados.
            </p>

            <Alert className="bg-neutral-100 dark:bg-neutral-900">
            <p className="text-gray-500 text-justify dark:text-gray-300 leading-relaxed ">
                Entre as principais fontes de dados integradas o {platform} estão o{" "}
                <strong>Lattes</strong>, a <strong>Plataforma Sucupira</strong>, o{" "}
                <strong>Journal Citation Reports (JCR)</strong> e o <strong>OpenAlex</strong>. Essas integrações 
                garantem a abrangência e a precisão dos dados, fornecendo informações valiosas para a gestão acadêmica, 
                análises estratégicas e elaboração de políticas institucionais.
            </p>
            </Alert>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ">
                2. Cadastro e Responsabilidades do Usuário
            </h2>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white ">2.1. Elegibilidade</h3>
            <p className="text-gray-500 text-justify dark:text-gray-300 leading-relaxed ">
                O uso do {platform} não é restrito a indivíduos com vínculo formal com {institution}, contudo o acesso para demais funções é concedido 
                mediante cadastro, no qual o usuário deve fornecer informações precisas e atualizadas, como nome 
                completo, e-mail institucional e identificadores acadêmicos (por exemplo, Lattes ou ORCID).
            </p>
            
            </div>
           

           


          

        

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                O fornecimento de informações falsas, incompletas ou desatualizadas pode resultar na suspensão ou 
                revogação do acesso à plataforma, de acordo com a política de uso estabelecida por {institution}.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">2.2. Uso de Credenciais</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Cada usuário é responsável por manter a confidencialidade de suas credenciais de acesso. Atividades 
                realizadas por meio dessas credenciais serão atribuídas ao titular da conta. Em caso de suspeita de uso 
                não autorizado, o usuário deve notificar imediatamente a administração do {platform} para adoção de 
                medidas de segurança.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Política de Uso</h2>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">3.1. Finalidade Permitida</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                O {platform} deve ser utilizada exclusivamente para fins acadêmicos, científicos e institucionais. 
                É permitida a consulta a dados acadêmicos, análise de indicadores de desempenho, geração de relatórios 
                estratégicos e apoio no desenvolvimento de projetos, publicações e planejamentos institucionais.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">3.2. Restrições</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                É expressamente proibido utilizar o {platform} para atividades que violem leis, regulamentos ou os 
                direitos de terceiros. Entre as atividades restritas estão:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>Compartilhar informações confidenciais sem autorização;</li>
                <li>Alterar ou manipular dados apresentados na plataforma de forma que comprometa sua integridade;</li>
                <li>Explorar vulnerabilidades ou comprometer a segurança do {platform};</li>
                <li>Utilizar o {platform} para finalidades comerciais ou não compatíveis com as atividades institucionais de {institution}.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                4. Atualizações e Manutenção
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                A equipe d{institution} está constantemente aprimorando as funcionalidades e a segurança da {platform}. 
                Durante as atualizações ou manutenções programadas, a plataforma pode ficar temporariamente indisponível. 
                Os usuários serão previamente notificados sempre que possível.
            </p>

           
        </Alert>
        </div>
       </div>
    );
}
