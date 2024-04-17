/* eslint-disable max-len */
import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';

const CookiesPolicy = () => {
  return (
    <div className='overflow-x-hidden'>
      <section className='p-[2vw] bg-amber-50'>
        <header className='flex justify-center'>
          <Link to='/'>
            <h2
              className='text-2xl absolute top-5 left-5
            handrawn hover:text-2.1xl'
            >
            &lt;- GJ.
            </h2>
          </Link>
          <h1 className='my-11 text-5xl handrawn'>Giovani Jogos</h1>
        </header>
        <h2 className='text-center font-bold leading-loose'>Política de Cookies</h2>

        <p className='py-5 indent-3'>
        A presente Política de Cookies é um documento complementar à Política de Privacidade
        da Giovani Jogos, disponível
          <Link to='/politicadeprivacidade' className='text-blue-600 hover:text-blue-700 hover:underline'> clicando aqui</Link>.
        Neste documento, você encontrará informações objetivas e claras sobre o que são Cookies, quais
        Cookies utilizamos em nossas aplicações, qual papel desempenham e como configurá-los.
        </p>

        <h3 className='text-center font-bold leading-loose'>1. O que são Cookies?</h3>

        <p className='py-5 indent-3'>
        Cookies são pequenos arquivos de texto ou fragmentos de informação que são baixados em seu computador, smartphone ou
        qualquer outro dispositivo com acesso à internet quando você visita nossa aplicação.

        Eles contêm informações sobre a sua navegação em nossas páginas e retêm apenas informações relacionadas a suas preferências.

        Assim, essa página consegue armazenar e recuperar os dados sobre os seus hábitos de navegação, de forma a melhorar a
        experiência de uso, por exemplo. É importante frisar que eles não contêm informações pessoais específicas, como dados
        sensíveis ou bancários.

        O seu navegador armazena os cookies no disco rígido, mas ocupam um espaço de memória mínimo, que não afetam o desempenho do
        seu computador. A maioria das informações são apagadas logo ao encerrar a sessão, como você verá no próximo tópico.
        </p>

        <h3 className='text-center font-bold leading-loose'>1.1. Tipos de Cookies</h3>

        <span className='block py-1'>
        Os cookies, quanto a seus proprietários, podem ser:
        </span>
        <span className='block'>
        1. <span className='font-bold'>Cookies proprietários: </span>são cookies definidos por nós ou por terceiros em nosso nome.
        </span>
        <span className='block pb-1'>
        2. <span className='font-bold'>Cookies de terceiros: </span>são cookies definidos por terceiros confiáveis em nossa aplicação.
        </span>
        <span className='block py-1'>
        Os cookies, quanto ao seu tempo de vida, podem ser:
        </span>
        <span className='block'>
        1. <span className='font-bold'>Cookies de sessão ou temporários: </span>são cookies que expiram assim que você fecha o seu
        navegador, encerrando a sessão.
        </span>
        <span className='block pb-1'>
        2. <span className='font-bold'>Cookies persistentes ou permanentes: </span>são cookies que permanecem no seu dispositivo
        durante um período determinado ou até que você os exclua.
        </span>
        <span className='block py-1'>
        Os cookies, quanto a sua finalidade, podem ser:
        </span>
        <span className='block'>
        1. <span className='font-bold'>Cookies necessários: </span>são cookies essenciais que possibilitam a navegação em nossas
        aplicações e o acesso a todos os recursos; sem estes, nossos serviços podem apresentar mal desempenho ou não funcionar.
        </span>
        <span className='block'>
        2. <span className='font-bold'>Cookies de desempenho: </span>são cookies que otimizam a forma que nossas aplicações
        funcionam, coletando informações anônimas sobre as páginas acessadas.
        </span>
        <span className='block'>
        3. <span className='font-bold'>Cookies de funcionalidade: </span>são cookies que memorizam suas preferências e
        escolhas (como seu nome de usuário).
        </span>
        <span className='block pb-1'>
        4. <span className='font-bold'>Cookies de publicidade: </span>são cookies que direcionam anúncios em função dos
        seus interesses e limitam a quantidade de vezes que o anúncio aparece.
        </span>

        <h3 className='text-center font-bold leading-loose'>2. Por que usamos Cookies?</h3>

        <p className='py-5 indent-3'>
        A Giovani Jogos utiliza Cookies para fornecer a melhor experiência de uso, tornando nossas aplicações mais
        fáceis e personalizadas, tendo por base suas escolhas e comportamento de navegação.

        Assim, buscamos entender como você utiliza nossas aplicações e ajustar o conteúdo para torná-lo mais relevante
        para você, além de lembrar de suas preferências.

        Os Cookies participam deste processo porquanto armazenam, leem e executam os dados necessários para cumprir com
        o nosso objetivo.
        </p>

        <h3 className='text-center font-bold leading-loose'>3. Que tipo de Cookies utilizamos?</h3>

        <p className='py-5 indent-3'>
        Abaixo listamos todos os Cookies que podem ser utilizados pela Giovani Jogos. É importante lembrar que você pode
        gerenciar a permissão concedida para cada Cookie em seu navegador.

        Além disso, uma vez que os Cookies capturam dados sobre você, aconselhamos a leitura de nossa Política de Privacidade,
        disponível <Link to='/politicadeprivacidade' className='text-blue-600 hover:text-blue-700 hover:underline'> clicando aqui.</Link>
        </p>

        <p className='py-5 indent-3'>
          <table>
            <tr>
              <th className='border-2 border-black p-1'>Nome do Cookie</th>
              <th className='border-2 border-black p-1'>Tipo</th>
              <th className='border-2 border-black p-1'>Tempo de vida</th>
              <th className='border-2 border-black p-1'>Finalidade</th>
            </tr>
            <tr>
              <td className='border-2 border-black p-1'>jwt_token</td>
              <td className='border-2 border-black p-1'>Cookie necessário</td>
              <td className='border-2 border-black p-1'>Persistente</td>
              <td className='border-2 border-black p-1'>Manter a sua sessão ativa</td>
            </tr>
          </table>
        </p>

        <h3 className='text-center font-bold leading-loose'>4. Gerenciamento dos Cookies</h3>

        <p className='py-5 indent-3'>
        A instalação dos cookies está sujeita ao seu consentimento. Apesar da maioria dos navegadores estar
        inicialmente configurada para aceitar cookies de forma automática, você pode rever suas permissões a
        qualquer tempo, de forma a bloqueá-los, aceitá-los ou ativar notificações para quando alguns cookies
        forem enviados ao seu dispositivo.

        Atualmente, na primeira vez que você acessa nossas aplicações, será requerida a sua concordância com
        a instalação destes. Apenas após a sua aceitação eles serão ativados.

        Para tanto, pedimos seu consentimento ao fazer login em Giovani Jogos. Dessa maneira, não apenas
        solicitamos sua concordância, mas também informamos que a navegação continuada em nossos sites
        será entendida como consentimento.

        Como já dito, você pode, a qualquer tempo e sem nenhum custo, alterar as permissões, bloquear
        ou recusar os Cookies. Você também pode configurá-los caso a caso. Todavia, a revogação do
        consentimento de determinados Cookies pode inviabilizar o funcionamento correto de alguns
        recursos da plataforma.

        Para gerenciar os cookies do seu navegador, basta fazê-lo diretamente nas configurações do
        navegador, na área de gestão de Cookies.
        </p>

        <span className='block py-1'>Você pode acessar tutoriais sobre o tema diretamente nos links abaixo:</span>

        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://support.microsoft.com/pt-br/help/17442/windows-internet-explorer-delete-manage-cookies'>Internet Explorer</a>.
        </span>
        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s'>Firefox</a>.
        </span>
        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://support.apple.com/pt-br/guide/safari/sfri11471/mac'>Safari</a>.
        </span>
        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&oco=1&hl=pt-BR'>Google Chrome</a>.
        </span>
        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://support.microsoft.com/pt-br/help/4027947/microsoft-edge-delete-cookies'>Microsoft Edge</a>.
        </span>
        <span className='block'>
          Se você usa o <a
            className='text-blue-600 hover:text-blue-700 hover:underline'
            href='https://help.opera.com/en/latest/web-preferences/#cookies'>Opera</a>.
        </span>

        <h3 className='text-center font-bold leading-loose'>5. Disposições finais</h3>

        <p className='py-5 indent-3'>
        Para a Giovani Jogos, a privacidade e confiança são fundamentais para a nossa relação com você.
        Estamos sempre nos atualizando para manter os mais altos padrões de segurança.

        Assim, reservamo-nos o direito de alterar esta Política de Cookies a qualquer tempo. As mudanças
        entrarão em vigor logo após a publicação, e você será avisado.

        Ao continuar a navegação nas nossas aplicações após essa mudança se tornar eficaz, você concorda
        com elas. Aconselhamos que você sempre verifique esta Política,
        bem como a nossa
          <Link to='/politicadeprivacidade' className='text-blue-600 hover:text-blue-700 hover:underline'> Política de Privacidade</Link>.
        </p>

        <span className='block py-1'>
        Em caso de dúvidas sobre esta Política de Cookies, entre em contato conosco pelos seguintes meios:
        </span>

        <span className='block py-1'>&#x2022; Email: giovanijogos@outlook.com.br</span>
        <span className='block py-1'>&#x2022; Email: killgiovani@gmail.com</span>

        <p className='py-5 indent-3'>Esta Política de Cookies foi atualizada pela última vez: 17/04/2024</p>

        <p className='indent-3 py-5'>
        O modelo em que esse documento se baseou foi produzido pela Equipe
          <a className='text-blue-600 hover:text-blue-700 hover:underline' href='https://legalcloud.com.br/'> Legalcloud </a>
        para auxiliar na elaboração de uma Política de Privacidade. <a
            className='text-blue-600 hover:text-blue-700 hover:underline' href='https://legalcloud.com.br/modelo-politica-privacidade/'>
          Veja o modelo original aqui.
          </a>
        </p>
      </section>
      <Footer/>
    </div>
  );
};

export default CookiesPolicy;
