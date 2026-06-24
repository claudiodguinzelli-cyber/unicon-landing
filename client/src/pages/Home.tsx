import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  CreditCard,
  Home as HomeIcon,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/**
 * Landing page Unicon Investimentos.
 * Correções aplicadas:
 * - Remove dependência de autenticação na página pública.
 * - Troca imagens antigas de /manus-storage/... para arquivos em client/public/.
 * - Envia formulário e simulador diretamente para o WhatsApp.
 */
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    creditAmount: "",
    creditPurpose: "",
  });

  const [creditAmount, setCreditAmount] = useState(100000);
  const [creditPeriod, setCreditPeriod] = useState(12);
  const [simulationType, setSimulationType] = useState("imovel");
  const [paymentType, setPaymentType] = useState("credito");
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    years: 0,
    satisfaction: 0,
    credit: 0,
  });
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPlan, setCurrentPlan] = useState(0);

  const WHATSAPP_NUMBER = "5549920026329";

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatCurrency = (value: number) => `R$ ${value.toLocaleString("pt-BR")}`;

  const testimonials = [
    {
      name: "João Silva",
      role: "Empresário",
      text: "A Unicon me ajudou a conseguir o crédito que precisava sem burocracias. Recomendo muito!",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Agricultora",
      text: "Consegui realizar meu sonho de expandir a propriedade graças ao consórcio. Muito satisfeita!",
      rating: 5,
    },
    {
      name: "Carlos Oliveira",
      role: "Comerciante",
      text: "Atendimento excelente e soluções que realmente funcionam. Voltaria com certeza!",
      rating: 5,
    },
    {
      name: "Ana Paula Costa",
      role: "Proprietária de Loja",
      text: "Consegui expandir meu negócio com o crédito da Unicon. Equipe muito profissional e atenciosa!",
      rating: 5,
    },
    {
      name: "Roberto Mendes",
      role: "Produtor Rural",
      text: "Melhor consultoria financeira que já tive. Consegui modernizar minha propriedade com facilidade.",
      rating: 5,
    },
    {
      name: "Fernanda Lima",
      role: "Consultora de Negócios",
      text: "Recomendo a Unicon para todos os meus clientes. Resultados garantidos e transparência total!",
      rating: 5,
    },
    {
      name: "Pedro Gomes",
      role: "Diretor Financeiro",
      text: "Parceria estratégica que agregou muito valor ao nosso negócio. Muito satisfeito com os resultados.",
      rating: 5,
    },
    {
      name: "Juliana Rocha",
      role: "Empreendedora",
      text: "Consegui realizar meu sonho de empreender com o apoio da Unicon. Muito grata!",
      rating: 5,
    },
  ];

  const products = [
    {
      number: "01",
      title: "Crédito Sem Entrada",
      description: "Acesso a crédito sem necessidade de entrada inicial. Modalidade flexível para suas necessidades.",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Consórcio Imóvel",
      description: "Realize o sonho da casa própria com taxas competitivas e sem juros abusivos.",
      icon: <HomeIcon className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Consórcio Veículo",
      description: "Adquira seu veículo com parcelas reduzidas e condições especiais.",
      icon: <Car className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Consultoria Financeira",
      description: "Assessoria personalizada para encontrar a melhor solução para seu perfil.",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  const plans = [
    { value: "100 mil", monthly: "R$ 450" },
    { value: "250 mil", monthly: "R$ 1.200" },
    { value: "300 mil", monthly: "R$ 1.563" },
    { value: "450 mil", monthly: "R$ 2.340" },
    { value: "700 mil", monthly: "R$ 3.500" },
    { value: "1 milhão", monthly: "R$ 5.000" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let count = 0;
          const clientInterval = setInterval(() => {
            if (count < 520) {
              count += 20;
              setAnimatedNumbers((prev) => ({ ...prev, clients: Math.min(count, 520) }));
            }
          }, 20);
          setTimeout(() => clearInterval(clientInterval), 1000);

          let yearCount = 0;
          const yearInterval = setInterval(() => {
            if (yearCount < 5) {
              yearCount += 0.5;
              setAnimatedNumbers((prev) => ({ ...prev, years: Math.min(yearCount, 5) }));
            }
          }, 100);
          setTimeout(() => clearInterval(yearInterval), 1200);

          let satisfactionCount = 0;
          const satisfactionInterval = setInterval(() => {
            if (satisfactionCount < 97) {
              satisfactionCount += 3;
              setAnimatedNumbers((prev) => ({ ...prev, satisfaction: Math.min(satisfactionCount, 97) }));
            }
          }, 30);
          setTimeout(() => clearInterval(satisfactionInterval), 1000);

          let creditCount = 0;
          const creditInterval = setInterval(() => {
            if (creditCount < 100) {
              creditCount += 3;
              setAnimatedNumbers((prev) => ({ ...prev, credit: Math.min(creditCount, 100) }));
            }
          }, 30);
          setTimeout(() => clearInterval(creditInterval), 1000);
        }
      },
      { threshold: 0.5 },
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) observer.observe(currentStatsRef);

    return () => {
      if (currentStatsRef) observer.unobserve(currentStatsRef);
    };
  }, [hasAnimated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.creditAmount || !formData.creditPurpose) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const message = [
      "Olá, vim pelo site da Unicon e quero falar sobre crédito/consórcio.",
      "",
      `Nome: ${formData.name}`,
      `Telefone: ${formData.phone}`,
      `Crédito pretendido: ${formData.creditAmount}`,
      `Finalidade: ${formData.creditPurpose}`,
    ].join("\n");

    openWhatsApp(message);

    toast.success("WhatsApp aberto com os dados preenchidos.");
    setFormData({ name: "", phone: "", creditAmount: "", creditPurpose: "" });
  };

  const handleSimulationSubmit = () => {
    const message = [
      "Olá, quero simular um consórcio pela Unicon.",
      "",
      `Tipo: ${simulationType === "imovel" ? "Imóvel" : "Veículo"}`,
      `Simular por: ${paymentType === "credito" ? "Crédito" : "Parcela"}`,
      `Valor selecionado: ${formatCurrency(creditAmount)}`,
      `Prazo selecionado: ${creditPeriod} mês${creditPeriod !== 1 ? "es" : ""}`,
    ].join("\n");

    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <img
              src="/unicon-logo.png"
              alt="Unicon Logo"
              className="h-16 w-auto"
              style={{ width: "auto", height: "60px" }}
            />
          </div>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center" style={{ marginRight: "129px", width: "1183px" }}>
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors text-sm font-medium">Sobre</a>
            <a href="#servicos" className="text-foreground hover:text-accent transition-colors text-sm font-medium">Serviços</a>
            <a href="#depoimentos" className="text-foreground hover:text-accent transition-colors text-sm font-medium">Depoimentos</a>
            <a href="#contato" className="text-foreground hover:text-accent transition-colors text-sm font-medium">Contato</a>
          </nav>

          <a href="#contato" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors inline-block">
            Fale Conosco
          </a>
        </div>
      </header>

      {/* Hero Section com Simulador */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              REALIZE SEUS OBJETIVOS COM SEGURANÇA E TRANSPARÊNCIA
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Soluções de crédito e consórcio personalizadas para empresários, agricultores e pessoas que buscam crescimento financeiro sem complicações.
            </p>
            <a href="#contato" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2">
              Começar Agora <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="bg-white text-foreground p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 font-montserrat">SIMULE SEU CONSÓRCIO AGORA!</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Selecione sua próxima conquista:</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSimulationType("imovel")}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
                    simulationType === "imovel" ? "bg-primary text-white" : "bg-gray-200 text-foreground hover:bg-gray-300"
                  }`}
                >
                  Imóvel
                </button>
                <button
                  type="button"
                  onClick={() => setSimulationType("veiculo")}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
                    simulationType === "veiculo" ? "bg-primary text-white" : "bg-gray-200 text-foreground hover:bg-gray-300"
                  }`}
                >
                  Veículo
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Simule seu plano por:</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType("credito")}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
                    paymentType === "credito" ? "bg-primary text-white" : "bg-gray-200 text-foreground hover:bg-gray-300"
                  }`}
                >
                  Crédito
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType("parcela")}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
                    paymentType === "parcela" ? "bg-primary text-white" : "bg-gray-200 text-foreground hover:bg-gray-300"
                  }`}
                >
                  Parcela
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Selecione o valor do crédito:</label>
              <div className="text-2xl font-bold text-primary mb-3">R$ {creditAmount.toLocaleString("pt-BR")}</div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="50000"
                value={creditAmount}
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Selecione o prazo do crédito: (1 a 240 meses)</label>
              <div className="text-2xl font-bold text-primary mb-3">
                {creditPeriod} mês{creditPeriod !== 1 ? "es" : ""}
              </div>
              <input
                type="range"
                min="1"
                max="240"
                value={creditPeriod}
                onChange={(e) => setCreditPeriod(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleSimulationSubmit}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition-colors block text-center"
            >
              Simular Agora
            </button>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat text-primary">
              A UNICON INVESTIMENTOS É PIONEIRA
            </h2>
            <p className="text-lg text-foreground/80">
              Com 5 anos de experiência, ajudamos empresários e pessoas físicas a realizarem seus sonhos através de estratégias financeiras personalizadas.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-montserrat">{animatedNumbers.clients || 520}+</div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">Clientes Satisfeitos</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-montserrat">{Math.round(animatedNumbers.years || 5)}</div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">Anos de Mercado</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-montserrat">{Math.round(animatedNumbers.satisfaction || 97)}%</div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">Avaliações 5⭐</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-montserrat">R$ {Math.round(animatedNumbers.credit || 100)}M</div>
              <div className="text-sm md:text-base text-foreground/70 font-medium">Crédito Contemplado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Serviços */}
      <section id="servicos" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-primary">
            O QUE VOCÊ PROCURA, NÓS TEMOS A SOLUÇÃO IDEAL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-accent mb-4">{product.number}</div>
                <h3 className="text-xl font-bold mb-3 text-primary font-montserrat">{product.title}</h3>
                <p className="text-foreground/70 text-sm">{product.description}</p>
                <div className="mt-4 text-accent">{product.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Planos */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-primary">
            PLANOS PARA VOCÊ APROVEITAR
          </h2>
          <div className="flex justify-center items-center gap-8">
            <button
              type="button"
              onClick={() => setCurrentPlan(Math.max(0, currentPlan - 1))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {plans.slice(currentPlan, currentPlan + 3).map((plan, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-accent mb-2">{plan.value}</div>
                  <div className="text-sm text-foreground/70 mb-4">Valor da parcela</div>
                  <div className="text-xl font-bold text-primary">{plan.monthly}</div>
                  <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Saiba Mais
                  </button>
                </Card>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPlan(Math.min(plans.length - 3, currentPlan + 1))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção Depoimentos */}
      <section id="depoimentos" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-primary">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              {testimonials[currentTestimonial] ? (
                <>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic text-foreground/80">"{testimonials[currentTestimonial].text}"</p>
                  <div className="font-bold text-primary">{testimonials[currentTestimonial].name}</div>
                  <div className="text-sm text-foreground/70">{testimonials[currentTestimonial].role}</div>
                </>
              ) : (
                <p className="text-foreground/70">Carregando depoimentos...</p>
              )}

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonial ? "bg-primary" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-foreground/70 mt-4">
                {currentTestimonial + 1} de {testimonials.length}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Representante Autorizado */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-montserrat text-primary">
            REPRESENTANTE AUTORIZADO
          </h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Somos representante autorizado das principais marcas de consórcio e crédito do Brasil
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center min-h-40">
              <img src="/embracon-logo.png" alt="Embracon - Representante Autorizado" className="h-24 w-auto object-contain" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center min-h-40">
              <img src="/yamaha-logo.png" alt="Yamaha - Representante Autorizado" className="h-24 w-auto object-contain" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center min-h-40">
              <img src="/tradicao-logo.png" alt="Tradição - Representante Autorizado" className="h-24 w-auto object-contain" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center min-h-40">
              <img src="/servopa-logo.png" alt="Servopa - Representante Autorizado" className="h-24 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-primary">
            VAMOS CONVERSAR?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-primary font-montserrat"> TELEFONE</h3>
                <p className="text-foreground/70">+55 49 92002-6329</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-primary font-montserrat"> LOCALIZAÇÃO</h3>
                <p className="text-foreground/70">Chapecó, Santa Catarina</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Crédito Pretendido (ex: R$ 50.000)"
                value={formData.creditAmount}
                onChange={(e) => setFormData({ ...formData, creditAmount: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Finalidade do Crédito (ex: Compra de equipamento)"
                value={formData.creditPurpose}
                onChange={(e) => setFormData({ ...formData, creditPurpose: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-primary/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/unicon-logo.png" alt="Unicon Logo" className="h-16 w-auto mb-4" />
              <p className="text-white/70 text-sm">Solução financeira para o crescimento da sua colheita.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 font-montserrat">LINKS RÁPIDOS</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 font-montserrat">CONTATO</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>+55 49 92002-6329</li>
                <li>Chapecó, SC</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 font-montserrat">REDES SOCIAIS</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="https://facebook.com/UniconInvestimentos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
            <p>© 2026 Unicon Investimentos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
