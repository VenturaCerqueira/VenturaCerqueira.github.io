# Gera resume/curriculo-en.html e resume/curriculo-es.html a partir de resume/curriculo-pt.html.
# Edite o português e as traduções abaixo; depois rode:  python resume/translate.py  e  node resume/build-pdf.js
import os

HERE = os.path.dirname(os.path.abspath(__file__))
pt = open(os.path.join(HERE, "curriculo-pt.html"), encoding="utf8").read()

# (texto em português, inglês, espanhol) — cada trecho precisa existir exatamente no HTML em português
T = [
    ('<html lang="pt-BR">', '<html lang="en">', '<html lang="es">'),
    ("Anderson Ventura Cerqueira - Currículo", "Anderson Ventura Cerqueira - Résumé", "Anderson Ventura Cerqueira - Currículum"),
    ("Analista de Desenvolvimento <em>Pleno</em> · Backend, Automação e IA", "<em>Mid-Level</em> Software Developer · Backend, Automation and AI", "Analista de Desarrollo <em>Semi Senior</em> · Backend, Automatización e IA"),
    ("Python · Node.js · SQL · APIs REST · Docker · Power BI", "Python · Node.js · SQL · REST APIs · Docker · Power BI", "Python · Node.js · SQL · APIs REST · Docker · Power BI"),
    ("<b>Busco:</b> Full stack / Análise e desenvolvimento de sistemas · CLT ou PJ · início imediato",
     "<b>Looking for:</b> Full stack / Systems development · CLT or contractor · available now",
     "<b>Busco:</b> Full stack / Análisis y desarrollo de sistemas · CLT o contratista · inicio inmediato"),
    ("<b>Candeias, BA</b> · Remoto ou híbrido", "<b>Candeias, BA, Brazil</b> · Remote or hybrid", "<b>Candeias, BA, Brasil</b> · Remoto o híbrido"),
    ("WhatsApp: <a href=\"https://wa.me/557181465381\">(71) 8146-5381</a>", "WhatsApp: <a href=\"https://wa.me/557181465381\">+55 71 8146-5381</a>", "WhatsApp: <a href=\"https://wa.me/557181465381\">+55 71 8146-5381</a>"),
    ("<h2>Resumo profissional</h2>", "<h2>Professional summary</h2>", "<h2>Resumen profesional</h2>"),
    ("""    Analista de Sistemas com mais de 5 anos em tecnologia e 3 promoções na Keep Informática. Atuo de ponta a ponta em
    sistemas de gestão tributária municipal usados por prefeituras: levantamento de requisitos como Product Owner,
    desenvolvimento backend em Python, Node.js e SQL, APIs REST, Docker e dashboards em Power BI. Fundador da DevTI's (MEI),
    onde desenvolvo sistemas, sites e automações para outras empresas, incluindo o produto AgendaAI. Uso IA no fluxo de
    desenvolvimento (assistentes e agentes de código, engenharia de prompt), sempre com revisão técnica do resultado.
    Mentor tecnológico de 6 equipes em projeto educacional.""",
     """    Systems Analyst with 5+ years in technology and 3 promotions at Keep Informática. I work end to end on municipal
    tax management systems used by Brazilian city governments: requirements gathering as Product Owner, backend
    development in Python, Node.js and SQL, REST APIs, Docker and Power BI dashboards. Founder of DevTI's (sole
    proprietorship), where I build systems, websites and automation for other businesses, including the AgendaAI product.
    I use AI in my development workflow (coding assistants and agents, prompt engineering), always with technical review
    of the output. Tech mentor for 6 teams in an educational project.""",
     """    Analista de Sistemas con más de 5 años en tecnología y 3 ascensos en Keep Informática. Trabajo de punta a punta en
    sistemas de gestión tributaria municipal utilizados por municipios: levantamiento de requisitos como Product Owner,
    desarrollo backend en Python, Node.js y SQL, APIs REST, Docker y dashboards en Power BI. Fundador de DevTI's (MEI),
    donde desarrollo sistemas, sitios web y automatizaciones para otras empresas, incluido el producto AgendaAI. Uso IA en
    mi flujo de desarrollo (asistentes y agentes de código, ingeniería de prompts), siempre con revisión técnica del
    resultado. Mentor tecnológico de 6 equipos en un proyecto educativo."""),
    ("<h2>Competências técnicas</h2>", "<h2>Technical skills</h2>", "<h2>Competencias técnicas</h2>"),
    ("<div><b>Bancos de dados:</b> MySQL, SQL Server, Firebird, modelagem de dados</div>", "<div><b>Databases:</b> MySQL, SQL Server, Firebird, data modeling</div>", "<div><b>Bases de datos:</b> MySQL, SQL Server, Firebird, modelado de datos</div>"),
    ("<div><b>APIs e integrações:</b> APIs REST, Postman, Swagger, web scraping</div>", "<div><b>APIs and integrations:</b> REST APIs, Postman, Swagger, web scraping</div>", "<div><b>APIs e integraciones:</b> APIs REST, Postman, Swagger, web scraping</div>"),
    ("<div><b>DevOps e automação:</b> Docker, Git, GitHub, scripts automatizados</div>", "<div><b>DevOps and automation:</b> Docker, Git, GitHub, automation scripts</div>", "<div><b>DevOps y automatización:</b> Docker, Git, GitHub, scripts de automatización</div>"),
    ("<div><b>Dados e BI:</b> Power BI, pandas, dashboards</div>", "<div><b>Data and BI:</b> Power BI, pandas, dashboards</div>", "<div><b>Datos y BI:</b> Power BI, pandas, dashboards</div>"),
    ("<div><b>IA:</b> Claude Code, ChatGPT, engenharia de prompt, fluxos multiagente</div>", "<div><b>AI:</b> Claude Code, ChatGPT, prompt engineering, multi-agent workflows</div>", "<div><b>IA:</b> Claude Code, ChatGPT, ingeniería de prompts, flujos multiagente</div>"),
    ("<div><b>Métodos:</b> Scrum, Jira, Product Owner, documentação técnica</div>", "<div><b>Methods:</b> Scrum, Jira, Product Owner, technical documentation</div>", "<div><b>Métodos:</b> Scrum, Jira, Product Owner, documentación técnica</div>"),
    ("<div><b>Front-end e UI:</b> HTML, CSS, JavaScript, design de interfaces</div>", "<div><b>Front-end and UI:</b> HTML, CSS, JavaScript, interface design</div>", "<div><b>Front-end y UI:</b> HTML, CSS, JavaScript, diseño de interfaces</div>"),
    ("<h2>Experiência profissional</h2>", "<h2>Professional experience</h2>", "<h2>Experiencia profesional</h2>"),
    # DevTI's
    ('<span class="job-title">Fundador e Desenvolvedor</span><span class="badge now">Atual</span>', '<span class="job-title">Founder and Developer</span><span class="badge now">Current</span>', '<span class="job-title">Fundador y Desarrollador</span><span class="badge now">Actual</span>'),
    ("<span class=\"job-company\">DevTI's (MEI) <small>· empresa própria, em paralelo</small></span></div>\n      <span class=\"period\">Atual</span>",
     "<span class=\"job-company\">DevTI's (MEI) <small>· my own company, in parallel</small></span></div>\n      <span class=\"period\">Present</span>",
     "<span class=\"job-company\">DevTI's (MEI) <small>· empresa propia, en paralelo</small></span></div>\n      <span class=\"period\">Actual</span>"),
    ("<li>Desenvolvimento de sistemas, sites e automações sob medida para outras empresas.</li>", "<li>Development of custom systems, websites and automation for other businesses.</li>", "<li>Desarrollo de sistemas, sitios web y automatizaciones a medida para otras empresas.</li>"),
    ("<li>Atendimento direto ao cliente: requisitos, proposta, desenvolvimento, entrega e suporte.</li>", "<li>Direct client relationship: requirements, proposal, development, delivery and support.</li>", "<li>Atención directa al cliente: requisitos, propuesta, desarrollo, entrega y soporte.</li>"),
    ("<li>Produto próprio AgendaAI: agendamento online e via WhatsApp com assistente inteligente.</li>", "<li>Own product AgendaAI: online and WhatsApp scheduling with an intelligent assistant.</li>", "<li>Producto propio AgendaAI: agendamiento en línea y por WhatsApp con asistente inteligente.</li>"),
    # Analista de Sistemas
    ('<span class="job-title">Analista de Sistemas</span><span class="badge promo">Promoção</span><span class="badge now">Atual</span>', '<span class="job-title">Systems Analyst</span><span class="badge promo">Promotion</span><span class="badge now">Current</span>', '<span class="job-title">Analista de Sistemas</span><span class="badge promo">Ascenso</span><span class="badge now">Actual</span>'),
    ('<span class="period">11/2023 - Atual</span>', '<span class="period">11/2023 - Present</span>', '<span class="period">11/2023 - Actual</span>'),
    ("<li>Atuação como Product Owner, conduzindo levantamento e análise de requisitos junto aos clientes.</li>", "<li>Product Owner role, leading requirements gathering and analysis with clients.</li>", "<li>Rol de Product Owner, liderando el levantamiento y análisis de requisitos con los clientes.</li>"),
    ("<li>Desenvolvimento e otimização de scripts em Python e SQL para automação de processos e performance.</li>", "<li>Development and optimization of Python and SQL scripts for process automation and performance.</li>", "<li>Desarrollo y optimización de scripts en Python y SQL para automatización de procesos y rendimiento.</li>"),
    ("<li>Manutenção, refatoração e correção de bugs, garantindo estabilidade e escalabilidade dos sistemas.</li>", "<li>Maintenance, refactoring and bug fixing, ensuring system stability and scalability.</li>", "<li>Mantenimiento, refactorización y corrección de errores, garantizando estabilidad y escalabilidad.</li>"),
    ("<li>Dashboards e relatórios estratégicos no Power BI para apoio à tomada de decisão.</li>", "<li>Strategic Power BI dashboards and reports to support decision-making.</li>", "<li>Dashboards e informes estratégicos en Power BI para apoyar la toma de decisiones.</li>"),
    ("<li>Implementação e testes de APIs REST; uso de Docker em ambientes conteinerizados.</li>", "<li>Implementation and testing of REST APIs; use of Docker in containerized environments.</li>", "<li>Implementación y pruebas de APIs REST; uso de Docker en entornos en contenedores.</li>"),
    ("<li>Sistemas em produção: e-Contrib (gestão tributária, NFS-e, dívida ativa, integração SIAFIC) e portais do contribuinte.</li>", "<li>Systems in production: e-Contrib (tax management, electronic service invoices, tax debt, SIAFIC integration) and taxpayer portals.</li>", "<li>Sistemas en producción: e-Contrib (gestión tributaria, factura electrónica de servicios, deuda tributaria, integración SIAFIC) y portales del contribuyente.</li>"),
    # Mentor
    ('<span class="job-title">Mentor Tech (Projeto Educacional)</span>', '<span class="job-title">Tech Mentor (Educational Project)</span>', '<span class="job-title">Mentor Tech (Proyecto Educativo)</span>'),
    ('<span class="job-company">Colégio Luiz Viana Filho <small>· Candeias, BA</small></span>', '<span class="job-company">Luiz Viana Filho School <small>· Candeias, BA</small></span>', '<span class="job-company">Colegio Luiz Viana Filho <small>· Candeias, BA</small></span>'),
    ("<li>Orientação de 6 equipes na criação de sites, sistemas e soluções digitais, incluindo projetos com Arduino.</li>", "<li>Mentored 6 teams building websites, systems and digital solutions, including Arduino projects.</li>", "<li>Guía de 6 equipos en la creación de sitios web, sistemas y soluciones digitales, incluidos proyectos con Arduino.</li>"),
    ("<li>Ensino de lógica de programação e boas práticas de desenvolvimento.</li>", "<li>Taught programming logic and development best practices.</li>", "<li>Enseñanza de lógica de programación y buenas prácticas de desarrollo.</li>"),
    # Analista de Suporte
    ('<span class="job-title">Analista de Suporte</span><span class="badge promo">Promoção</span>', '<span class="job-title">Support Analyst</span><span class="badge promo">Promotion</span>', '<span class="job-title">Analista de Soporte</span><span class="badge promo">Ascenso</span>'),
    ("<li>Diagnóstico e resolução de incidentes em sistemas corporativos.</li>", "<li>Diagnosis and resolution of incidents in corporate systems.</li>", "<li>Diagnóstico y resolución de incidentes en sistemas corporativos.</li>"),
    ("<li>Testes funcionais e de desempenho; manutenção e ajustes em código-fonte.</li>", "<li>Functional and performance testing; source code maintenance and adjustments.</li>", "<li>Pruebas funcionales y de rendimiento; mantenimiento y ajustes en el código fuente.</li>"),
    ("<li>Documentação técnica e treinamento de usuários em segurança da informação.</li>", "<li>Technical documentation and user training on information security.</li>", "<li>Documentación técnica y capacitación de usuarios en seguridad de la información.</li>"),
    # Suporte Técnico
    ('<span class="job-title">Suporte Técnico</span>', '<span class="job-title">Technical Support</span>', '<span class="job-title">Soporte Técnico</span>'),
    ("<li>Suporte a clientes internos e externos com foco em alta disponibilidade dos sistemas.</li>", "<li>Support for internal and external clients with a focus on high system availability.</li>", "<li>Soporte a clientes internos y externos con foco en alta disponibilidad de los sistemas.</li>"),
    ("<li>Análise de falhas e testes para identificar gargalos de desempenho; documentação de processos.</li>", "<li>Failure analysis and testing to identify performance bottlenecks; process documentation.</li>", "<li>Análisis de fallas y pruebas para identificar cuellos de botella; documentación de procesos.</li>"),
    # Estágio
    ('<span class="job-title">Estagiário de Suporte Técnico</span>', '<span class="job-title">Technical Support Intern</span>', '<span class="job-title">Pasante de Soporte Técnico</span>'),
    ("<li>Help Desk e Service Desk, backup e restauração de dados, monitoramento de redes.</li>", "<li>Help desk and service desk, data backup and restore, network monitoring.</li>", "<li>Help desk y service desk, copias de seguridad y restauración de datos, monitoreo de redes.</li>"),
    # Projetos
    ("<h2>Projetos em destaque</h2>", "<h2>Featured projects</h2>", "<h2>Proyectos destacados</h2>"),
    ("<p>SaaS de agendamento online e via WhatsApp para salões, clínicas e autônomos, com assistente inteligente.</p>", "<p>Online and WhatsApp scheduling SaaS for salons, clinics and independent professionals, with an intelligent assistant.</p>", "<p>SaaS de agendamiento en línea y por WhatsApp para salones, clínicas e independientes, con asistente inteligente.</p>"),
    ("<p>Gestão tributária municipal: tributos, NFS-e nacional, dívida ativa e integração com o SIAFIC.</p>", "<p>Municipal tax management: taxes, national electronic service invoices (NFS-e), tax debt and SIAFIC integration.</p>", "<p>Gestión tributaria municipal: tributos, factura electrónica de servicios (NFS-e), deuda tributaria e integración con SIAFIC.</p>"),
    ("<b>NFS-e e Portal do Contribuinte</b>", "<b>NFS-e and Taxpayer Portal</b>", "<b>NFS-e y Portal del Contribuyente</b>"),
    ("<p>Design da tela de login da NFS-e e portal municipal de guias, certidões e validação de documentos.</p>", "<p>NFS-e login page design and a city portal for payment slips, certificates and document validation.</p>", "<p>Diseño de la pantalla de login de NFS-e y portal municipal de boletas, certificados y validación de documentos.</p>"),
    ("<b>API CNAE do IBGE</b>", "<b>IBGE CNAE API</b>", "<b>API CNAE del IBGE</b>"),
    ("<p>API em TypeScript/Node.js que consome e formata dados da CNAE, com documentação Swagger.</p>", "<p>TypeScript/Node.js API that consumes and formats Brazil's CNAE economic activity data, with Swagger docs.</p>", "<p>API en TypeScript/Node.js que consume y formatea datos de la CNAE, con documentación Swagger.</p>"),
    ("<b>Scraping eSocial</b>", "<b>eSocial Scraping</b>", "<b>Scraping de eSocial</b>"),
    ("<p>Extração automatizada em Python com retomada de progresso, tolerância a falhas e exportação CSV.</p>", "<p>Automated Python extraction with progress resume, fault tolerance and CSV export.</p>", "<p>Extracción automatizada en Python con reanudación del progreso, tolerancia a fallos y exportación CSV.</p>"),
    ("<b>Gerador de esquema MySQL → Markdown</b>", "<b>MySQL schema → Markdown generator</b>", "<b>Generador de esquema MySQL → Markdown</b>"),
    ("<p>Extrai metadados de tabelas e colunas e gera documentação de banco de dados em Markdown.</p>", "<p>Extracts table and column metadata and generates database documentation in Markdown.</p>", "<p>Extrae metadatos de tablas y columnas y genera documentación de base de datos en Markdown.</p>"),
    # Formação
    ("<h2>Formação acadêmica</h2>", "<h2>Education</h2>", "<h2>Formación académica</h2>"),
    ("<div><b>Bacharelado em Engenharia de Software</b><br /><span class=\"muted\">UCSAL, Universidade Católica do Salvador · conclusão prevista em 07/2029</span></div>",
     "<div><b>Bachelor's degree in Software Engineering</b><br /><span class=\"muted\">UCSAL, Catholic University of Salvador · expected 07/2029</span></div>",
     "<div><b>Licenciatura en Ingeniería de Software</b><br /><span class=\"muted\">UCSAL, Universidad Católica de Salvador · finalización prevista 07/2029</span></div>"),
    ("<div><b>Pós-graduação em BI, Big Data e Analytics</b><br /><span class=\"muted\">UNOPAR, Universidade Norte do Paraná · concluída</span></div>",
     "<div><b>Postgraduate degree in BI, Big Data and Analytics</b><br /><span class=\"muted\">UNOPAR, Northern Paraná University · completed</span></div>",
     "<div><b>Posgrado en BI, Big Data y Analytics</b><br /><span class=\"muted\">UNOPAR, Universidad Norte de Paraná · finalizado</span></div>"),
    ("<div><b>Tecnólogo em Análise e Desenvolvimento de Sistemas</b><br /><span class=\"muted\">Faculdade São Salvador · concluído</span></div>",
     "<div><b>Associate degree in Systems Analysis and Development</b><br /><span class=\"muted\">Faculdade São Salvador · completed</span></div>",
     "<div><b>Tecnicatura en Análisis y Desarrollo de Sistemas</b><br /><span class=\"muted\">Faculdade São Salvador · finalizada</span></div>"),
    ("<h2>Cursos</h2>", "<h2>Courses</h2>", "<h2>Cursos</h2>"),
    ("<span>Projetos Ágeis com Scrum</span><span>PHP e Laravel (Udemy)</span><span>Algoritmos e Estrutura de Dados</span>",
     "<span>Agile Projects with Scrum</span><span>PHP and Laravel (Udemy)</span><span>Algorithms and Data Structures</span>",
     "<span>Proyectos Ágiles con Scrum</span><span>PHP y Laravel (Udemy)</span><span>Algoritmos y Estructuras de Datos</span>"),
    ("<span>Introdução ao Git e GitHub</span><span>Modelagem de Dados</span><span>Fundamentos de Redes (Cisco / SENAI)</span>",
     "<span>Introduction to Git and GitHub</span><span>Data Modeling</span><span>Networking Fundamentals (Cisco / SENAI)</span>",
     "<span>Introducción a Git y GitHub</span><span>Modelado de Datos</span><span>Fundamentos de Redes (Cisco / SENAI)</span>"),
    ('<h2 style="margin-top:10px">Idiomas</h2>', '<h2 style="margin-top:10px">Languages</h2>', '<h2 style="margin-top:10px">Idiomas</h2>'),
    ("<p><b>Português:</b> nativo · <b>Inglês:</b> técnico (leitura de documentação) · <b>Espanhol:</b> básico (leitura)</p>",
     "<p><b>Portuguese:</b> native · <b>English:</b> technical (reading documentation) · <b>Spanish:</b> basic (reading)</p>",
     "<p><b>Portugués:</b> nativo · <b>Inglés:</b> técnico (lectura de documentación) · <b>Español:</b> básico (lectura)</p>"),
    ('<footer>Portfólio com projetos, prints dos sistemas e versões em inglês e espanhol: <b><a href="https://venturacerqueira.github.io">venturacerqueira.github.io</a></b></footer>',
     '<footer>Portfolio with projects, system screenshots and case studies: <b><a href="https://venturacerqueira.github.io/en/">venturacerqueira.github.io/en</a></b></footer>',
     '<footer>Portafolio con proyectos, capturas de los sistemas y casos de estudio: <b><a href="https://venturacerqueira.github.io/es/">venturacerqueira.github.io/es</a></b></footer>'),
]

for idx, lang in [(1, "en"), (2, "es")]:
    s = pt
    for row in T:
        assert row[0] in s, f"[{lang}] não encontrado: {row[0][:70]}"
        s = s.replace(row[0], row[idx], 1)
    open(os.path.join(HERE, f"curriculo-{lang}.html"), "w", encoding="utf8").write(s)
    print("gerado:", f"resume/curriculo-{lang}.html")
