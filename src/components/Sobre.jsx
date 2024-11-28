import React from "react";
import './style/Sobre.css'

function Sobre() {
    return (
        <div id="sobre">
            <div className="principal">
                <h1>Soluções Inteligentes para um Futuro Mais Ágil</h1>
                <p>Levamos a inteligência artificial ao alcance de todos, simplificando processos e transformando negócios</p>
                <button>Conheça Nossas Soluções</button>
            </div>
            <div className="padding pt2">
                <h2>Quem Somos</h2>
                <p>A IAgiliza nasceu com a missão de tornar a inteligência artificial acessível a empresas de todos os tamanhos. Desenvolvemos soluções inovadoras que simplificam operações e potencializam resultados, ajudando nossos clientes a se destacarem no mercado.</p>
            </div>

            <div className="padding pt3">
                <h2>Nossa Essência</h2>
                <div id="txtgrid2">
                    <div className="txtbox">
                        <h3>Missão:</h3>
                        <p className="txt">
                            Proporcionar soluções tecnológicas de Inteligência Artificial, adaptadas a empresas de todos os tamanhos, com foco em automação de processos e otimização de atendimentos.
                        </p>
                    </div>
                    <div className="txtbox">
                        <h3>Visão:</h3>
                        <p className="txt">
                            Ser referência no mercado de soluções de IA, impactando positivamente a produtividade e a competitividade dos nossos clientes através da inovação tecnológica.
                        </p>
                    </div>
                    <div className="txtbox">
                        <h3>Valores:</h3>
                        <p className="txt">
                            <ol>
                                <li>Inovação contínua.</li>
                                <li>Compromisso com resultados.</li>
                                <li>Ética e transparência.</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div className="padding pt4">
                <h2>De Onde Viemos e Para Onde Vamos</h2>
                <p>Fundada com o propósito de democratizar o uso da inteligência artificial, a IAgiliza tem se dedicado a criar soluções práticas e eficientes. Desde o início, acreditamos que a tecnologia deve ser uma aliada para empresas de todos os portes. Hoje, nosso foco é continuar inovando e ajudando negócios a prosperar.</p>
            </div>

            <div className="padding pt5">
                <h2>O que nos torna únicos</h2>
                <div className="txtlist"><p>Inovação e Agilidade: <br /> Desenvolvemos soluções modernas e práticas com rapidez.</p></div>
                <div className="txtlist"><p>Compromisso com Prazos: <br /> Cumprimos o que prometemos, sempre dentro do prazo.</p></div>
                <div className="txtlist"><p>Alto Retorno sobre o Investimento (ROI): <br />Reduzimos custos operacionais e aumentamos a eficiência.
                </p></div>
            </div>

            <div className="padding pt6">
                <h2>Pronto para transformar seu negócio com a IAgiliza?</h2>
                <p>Descubra como nossas soluções de IA podem fazer a diferença no seu dia a dia.</p>
                <button>Conheça Nossos Serviços</button>
                <button>Fale Conosco</button>
            </div>

        </div>

    );
}

export default Sobre;