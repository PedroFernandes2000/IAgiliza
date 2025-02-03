import re
import json
import requests
from bs4 import BeautifulSoup
import openai
import os
import API_KEY

# Configurações
openai.api_key = API_KEY.OPENAI_API_KEY 

NUM_NOTICIAS = 4  # Número de notícias para coletar
JSON_FILE = "./noticias.json"

def coletar_noticias():
    """Coleta notícias sobre IA de múltiplos sites."""
    NEWS_SOURCES = [
        {
            "name": "CNN Brasil",
            "url": "https://www.cnnbrasil.com.br/tudo-sobre/inteligencia-artificial/",
            "container_selector": "a.home__list__tag",
            "content_selector": "article"
        },
        {
            "name": "TecMundo",
            "url": "https://www.tecmundo.com.br/inteligencia-artificial",
            "container_selector": "a.tec--card__title__link",
            "content_selector": "div.tec--article__body"
        }
    ]

    textos = []
    
    for source in NEWS_SOURCES:
        try:
            print(f"🔍 Coletando notícias de {source['name']}...")
            response = requests.get(source["url"], timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")
            links_noticias = [a["href"] for a in soup.select(source["container_selector"])[:2]]  # 2 notícias por site
            
            for link in links_noticias:
                try:
                    # Verifica se o link é absoluto ou relativo
                    if not link.startswith("http"):
                        link = requests.compat.urljoin(source["url"], link)
                        
                    artigo_response = requests.get(link, timeout=15)
                    artigo_response.raise_for_status()
                    
                    soup_artigo = BeautifulSoup(artigo_response.text, "html.parser")
                    conteudo = soup_artigo.select_one(source["content_selector"])
                    
                    if conteudo:
                        texto = conteudo.get_text(strip=True, separator="\n")
                        textos.append(f"Fonte: {source['name']}\n{texto}")
                        print(f"✅ Notícia coletada de {source['name']}")
                    else:
                        print(f"⚠️ Conteúdo não encontrado em {link}")
                    
                except Exception as e:
                    print(f"Erro ao processar {link}: {str(e)}")
                    continue
                
        except Exception as e:
            print(f"Erro ao coletar de {source['name']}: {str(e)}")
            continue
    
    return "\n\n---\n\n".join(textos)

def gerar_resumo_gpt(texto):
    """Gera o resumo formatado em HTML usando a API da OpenAI."""
    prompt = (
        "Resuma as principais notícias sobre Inteligência Artificial desta semana em um texto coeso, "
        "com estrutura HTML usando EXATAMENTE estas classes e tags:\n\n"
        '<div class="space-y-5 md:space-y-8 max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">\n'
        '  <h2 class="text-2xl font-bold md:text-3xl dark:text-white">Manchete Principal</h2>\n'
        '  <p class="text-lg text-gray-800 dark:text-neutral-200">Parágrafo 1</p>\n'
        '  <p class="text-lg text-gray-800 dark:text-neutral-200">Parágrafo 2</p>\n'
        '  <!-- Adicione quantos parágrafos forem necessários -->\n'
        '</div>\n\n'
        "Mantenha a linguagem natural e jornalística. Destaque:\n"
        "- Avanços tecnológicos importantes\n"
        "- Eventos marcantes\n"
        "- Impactos sociais/econômicos\n"
        "- Curiosidades relevantes\n\n"
        "Notícias brutas para análise:\n" + texto
    )

    try:
        resposta = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Você é um editor-chefe especializado em tecnologia."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=1500
        )
        return resposta.choices[0].message.content
    
    except Exception as e:
        return f"<div class='error'>Erro ao gerar resumo: {str(e)}</div>"

def extrair_titulo(html):
    """Extrai o título da manchete do HTML gerado."""
    match = re.search(r'<h2 class="text-2xl font-bold md:text-3xl dark:text-white">(.*?)</h2>', html)
    if match:
        titulo = match.group(1).strip()
        # Remove caracteres inválidos para nome de arquivo
        titulo = re.sub(r'[\\/*?:"<>|]', "", titulo)
        return titulo[:60]  # Limita o tamanho do nome do arquivo
    return "resumo_semanal_ia"

def salvar_html(conteudo, nome_arquivo):
    """Salva o conteúdo gerado em um arquivo HTML."""
    cabecalho = """<!DOCTYPE html>
<html lang="pt-br" class="relative min-h-full dark">

<head>
    <!-- Required Meta Tags Always Come First -->
    <meta charset="utf-8">
    <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Descubra novas pocibilidades com a IAgiliza">

    <!-- Title -->
    <title>Blog IA</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="./imges/icon_IAgiliza.png">

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Theme Check and Update -->
    <script>
        const html = document.querySelector('html');
        const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: light)').matches);
        const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: light)').matches);

        if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
        else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
        else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
        else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
        else html.classList.add('dark');
    </script>

    <!-- CSS Preline -->
    <link rel="stylesheet" href="https://preline.co/assets/css/main.min.css">
</head>

<body class="bg-neutral-900">
    <!-- ========== HEADER ========== -->
    <header class="sticky top-0 inset-x-0 z-50 w-full bg-neutral-900 shadow-md">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <!-- Logo -->
            <a href="./index.html" class="flex items-center text-blue-500 text-lg font-bold">
                <img src="./imges/icon_IAgiliza.png" class="w-7 mx-2">
                <span class="ml-2 mt-2">IAgiliza</span>
            </a>

            <!-- Menu Items -->
            <div class="hidden md:flex items-center space-x-6">
                <a href="./servicos.html" class="text-sm text-gray-200 hover:text-blue-500 transition">Serviços</a>
                <a href="./sobre.html" class="text-sm text-gray-200 hover:text-blue-500 transition">Sobre</a>
                <a href="./Depoimentos.html" class="text-sm text-gray-200 hover:text-blue-500 transition">Depoimentos</a>
                <a href="./Contato.html" class="text-sm text-gray-200 hover:text-blue-500 transition">Contato</a>
                <a href="./blog.html" class="text-sm text-gray-200 hover:text-blue-500 transition">Blog</a>
            </div>

            <!-- Call to Action -->
            <div class="hidden md:flex">
                <a href="./login.html"
                    class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                    Login
                </a>
            </div>

            <!-- Mobile Menu Toggle -->
            <div class="md:hidden flex items-center">
                <button id="mobile-menu-button" class="text-gray-200 focus:outline-none">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden bg-neutral-900 md:hidden">
            <div class="flex flex-col space-y-4 p-4">
                <a href="./servicos.html" class="text-sm text-gray-200 hover:text-blue-400 transition">Serviços</a>
                <a href="./sobre.html" class="text-sm text-gray-200 hover:text-blue-400 transition">Sobre</a>
                <a href="./Depoimentos.html"
                    class="text-sm text-gray-200 hover:text-blue-400 transition">Depoimentos</a>
                <a href="./Contato.html" class="text-sm text-gray-200 hover:text-blue-400 transition">Contato</a>
                <a href="./blog.html" class="text-sm text-gray-200 hover:text-blue-400 transition">Blog</a>
                <a href="./login.html"
                    class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition text-center">Login</a>
            </div>
        </div>

        <script>
            const menuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        </script>
    </header>
"""
    rodape = """<footer class="relative overflow-hidden bg-neutral-900">
        <svg class="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2" width="2745" height="488"
            viewBox="0 0 2745 488" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 308.873C232.505 381.81 853.749 505.692 1482.69 417.728C2111.63 329.765 2585.54 412.597 2743.87 465.009"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 264.891C232.505 337.828 853.749 461.71 1482.69 373.747C2111.63 285.783 2585.54 368.615 2743.87 421.027"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 220.909C232.505 293.846 853.749 417.728 1482.69 329.765C2111.63 241.801 2585.54 324.633 2743.87 377.045"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 198.918C232.505 271.855 853.749 395.737 1482.69 307.774C2111.63 219.81 2585.54 302.642 2743.87 355.054"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 176.927C232.505 249.864 853.749 373.746 1482.69 285.783C2111.63 197.819 2585.54 280.651 2743.87 333.063"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 154.937C232.505 227.873 853.749 351.756 1482.69 263.792C2111.63 175.828 2585.54 258.661 2743.87 311.072"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 132.946C232.505 205.882 853.749 329.765 1482.69 241.801C2111.63 153.837 2585.54 236.67 2743.87 289.082"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 110.955C232.505 183.891 853.749 307.774 1482.69 219.81C2111.63 131.846 2585.54 214.679 2743.87 267.091"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 88.9639C232.505 161.901 853.749 285.783 1482.69 197.819C2111.63 109.855 2585.54 192.688 2743.87 245.1"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 66.9729C232.505 139.91 853.749 263.792 1482.69 175.828C2111.63 87.8643 2585.54 170.697 2743.87 223.109"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 44.9819C232.505 117.919 853.749 241.801 1482.69 153.837C2111.63 65.8733 2585.54 148.706 2743.87 201.118"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 22.991C232.505 95.9276 853.749 219.81 1482.69 131.846C2111.63 43.8824 2585.54 126.715 2743.87 179.127"
                class="stroke-neutral-700/50" stroke="currentColor" />
            <path
                d="M0.5 1C232.505 73.9367 853.749 197.819 1482.69 109.855C2111.63 21.8914 2585.54 104.724 2743.87 157.136"
                class="stroke-neutral-700/50" stroke="currentColor" />
        </svg>

        <div class="relative z-10">
            <div class="w-full max-w-5xl px-4 xl:px-0 py-10 lg:pt-16 mx-auto">
                <div class="inline-flex items-center">
                    <!-- Logo -->
                    <div class="flex items-center text-blue-500 text-lg font-bold">
                        <img src="./imges/icon_IAgiliza.png" class="w-7 mx-2">
                        <span class="ml-2 mt-2">IAgiliza</span>
                    </div>
                    <!-- End Logo -->

                    <div class="border-s border-neutral-700 ps-5 ms-5">
                        <p class="text-sm text-neutral-400">2024 IAgiliza ltda.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- ========== END FOOTER ========== -->




    <!-- JS Implementing Plugins -->
    <script src="https://cdn.jsdelivr.net/npm/preline/dist/preline.min.js"></script>
    <script src="./index.js"></script>

</body>"""
    
    with open(nome_arquivo, "w", encoding="utf-8") as f:
        f.write(cabecalho + conteudo + rodape)

def carregar_json():
    """Carrega o conteúdo do arquivo JSON ou retorna uma lista vazia se o arquivo não existir ou estiver vazio."""
    if os.path.exists(JSON_FILE) and os.path.getsize(JSON_FILE) > 0:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                print("⚠️ Arquivo JSON corrompido ou vazio. Inicializando com uma lista vazia.")
                return []
    return []

def atualizar_json(nova_noticia):
    """Atualiza o arquivo JSON com a nova notícia."""
    noticias = carregar_json()  # Carrega as notícias existentes ou inicia com uma lista vazia
    noticias.insert(0, nova_noticia)

    
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(noticias, f, ensure_ascii=False, indent=4)
      

def gerar_imagem(prompt):
    """Gera uma imagem usando a API DALL-E da OpenAI."""
    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,  # Número de imagens a serem geradas
            size="1024x1024"  # Tamanho da imagem
        )
        return response['data'][0]['url']  # Retorna a URL da imagem gerada
    except Exception as e:
        print(f"Erro ao gerar imagem: {e}")
        return ""

#if __name__ == "__main__":
    print("🔄 Coletando notícias sobre IA...")
    noticias = coletar_noticias()
    
    if noticias:
        print("📝 Gerando resumo semanal...")
        html_final = gerar_resumo_gpt(noticias)
        
        # Extrai o título da manchete para nomear o arquivo
        titulo = extrair_titulo(html_final)
        nome_arquivo = f"{titulo}.html"

        # Gera uma imagem para a notícia
        prompt_imagem = f"Crie uma imagem ilustrativa para a notícia: {titulo}"
        url_imagem = gerar_imagem(prompt_imagem)
        
        # Salva o arquivo com o nome da manchete
        salvar_html(html_final, nome_arquivo)

        # Atualiza o JSON com a nova notícia
        nova_noticia = {
            "titulo": titulo,
            "arquivo": nome_arquivo,
            "imagem": url_imagem
        }
        atualizar_json(nova_noticia)
        
        print(f"✅ Resumo gerado com sucesso em '{nome_arquivo}' e adicionado ao JSON.")
    else:
        print("❌ Nenhuma notícia encontrada para processar.")
