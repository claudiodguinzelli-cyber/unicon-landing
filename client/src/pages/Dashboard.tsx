import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, Share2, TrendingUp, Users, DollarSign, Award } from "lucide-react";
import { useState } from "react";

/**
 * Dashboard Interativo - Apresentação Visual dos Resultados
 * Permite explorar dados, compreender tendências e compartilhar facilmente
 */

export default function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Dados de crescimento da Unicon
  const growthData = [
    { mes: "Jan", clientes: 45, credito: 2.5, satisfacao: 85 },
    { mes: "Fev", clientes: 62, credito: 3.8, satisfacao: 88 },
    { mes: "Mar", clientes: 78, credito: 5.2, satisfacao: 90 },
    { mes: "Abr", clientes: 95, credito: 7.1, satisfacao: 92 },
    { mes: "Mai", clientes: 118, credito: 9.5, satisfacao: 94 },
    { mes: "Jun", clientes: 145, credito: 12.8, satisfacao: 95 },
  ];

  // Dados de distribuição de serviços
  const servicesData = [
    { name: "Crédito Sem Entrada", value: 35, color: "#C9A84C" },
    { name: "Consórcio", value: 28, color: "#0D3B2E" },
    { name: "Meia Parcela", value: 22, color: "#1A5C3A" },
    { name: "Múltiplas Administradoras", value: 15, color: "#2D7A4F" },
  ];

  // Dados de satisfação por tipo de cliente
  const satisfacaoData = [
    { tipo: "Empresários", satisfacao: 96, clientes: 45 },
    { tipo: "Agricultores", satisfacao: 94, clientes: 38 },
    { tipo: "Comerciantes", satisfacao: 92, clientes: 32 },
    { tipo: "Profissionais", satisfacao: 95, clientes: 30 },
  ];

  // Dados de impacto financeiro
  const impactoData = [
    { ano: "2023", credito: 45, clientes: 120, taxa: 88 },
    { ano: "2024", credito: 89, clientes: 245, taxa: 92 },
    { ano: "2025", credito: 145, clientes: 380, taxa: 95 },
    { ano: "2026", credito: 210, clientes: 520, taxa: 97 },
  ];

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generateReport()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "unicon_relatorio.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    const text = "Confira o dashboard interativo da Unicon Investimentos! 📊 Crescimento comprovado, soluções financeiras personalizadas e satisfação de clientes acima de 90%.";
    if (navigator.share) {
      navigator.share({
        title: "Unicon Investimentos - Dashboard",
        text: text,
        url: window.location.href,
      });
    } else {
      alert("Compartilhamento não disponível neste navegador");
    }
  };

  const generateReport = () => {
    return `
RELATÓRIO EXECUTIVO - UNICON INVESTIMENTOS
==========================================

RESUMO EXECUTIVO
- Total de Clientes: 520+
- Crédito Contemplado: R$ 210 milhões
- Taxa de Satisfação: 97%
- Crescimento YoY: 135%

SERVIÇOS OFERECIDOS
- Crédito Sem Entrada: 35%
- Consórcio: 28%
- Meia Parcela: 22%
- Múltiplas Administradoras: 15%

SEGMENTAÇÃO DE CLIENTES
- Empresários: 45 clientes (96% satisfação)
- Agricultores: 38 clientes (94% satisfação)
- Comerciantes: 32 clientes (92% satisfação)
- Profissionais: 30 clientes (95% satisfação)

TENDÊNCIAS
- Crescimento consistente de clientes
- Aumento na taxa de satisfação
- Diversificação de serviços
- Expansão de administradoras parceiras

CONCLUSÃO
A Unicon Investimentos demonstra crescimento sustentável com foco em satisfação do cliente.
    `;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-8 border-b border-accent/20">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Interativo</h1>
              <p className="text-white/80">Unicon Investimentos - Análise de Crescimento e Resultados</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Relatório
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-white text-white hover:bg-white/10 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-white border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold mb-2">Total de Clientes</p>
                <p className="text-4xl font-bold text-primary">520+</p>
                <p className="text-accent text-sm mt-2">↑ 135% crescimento</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold mb-2">Crédito Contemplado</p>
                <p className="text-4xl font-bold text-primary">R$ 210M</p>
                <p className="text-accent text-sm mt-2">↑ 136% crescimento</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold mb-2">Taxa de Satisfação</p>
                <p className="text-4xl font-bold text-primary">97%</p>
                <p className="text-accent text-sm mt-2">↑ 9% vs 2023</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-semibold mb-2">Crescimento YoY</p>
                <p className="text-4xl font-bold text-primary">135%</p>
                <p className="text-accent text-sm mt-2">Aceleração consistente</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Crescimento ao Longo do Tempo */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Crescimento Mensal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D3B2E",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clientes"
                  stroke="#C9A84C"
                  strokeWidth={2}
                  name="Clientes"
                  dot={{ fill: "#C9A84C" }}
                />
                <Line
                  type="monotone"
                  dataKey="credito"
                  stroke="#0D3B2E"
                  strokeWidth={2}
                  name="Crédito (M)"
                  dot={{ fill: "#0D3B2E" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribuição de Serviços */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Distribuição de Serviços</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D3B2E",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Satisfação por Segmento */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Satisfação por Segmento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={satisfacaoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="tipo" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D3B2E",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="satisfacao" fill="#C9A84C" name="Satisfação %" radius={[8, 8, 0, 0]} />
                <Bar dataKey="clientes" fill="#0D3B2E" name="Clientes" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Impacto Financeiro Anual */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">Impacto Financeiro Anual</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="ano" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D3B2E",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="credito" fill="#C9A84C" name="Crédito (M)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="clientes" fill="#0D3B2E" name="Clientes" radius={[8, 8, 0, 0]} />
                <Bar dataKey="taxa" fill="#1A5C3A" name="Satisfação %" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <h4 className="font-bold text-primary mb-3">📈 Crescimento Acelerado</h4>
            <p className="text-foreground/70 text-sm leading-relaxed">
              A Unicon demonstra crescimento consistente com 135% de aumento em clientes e 136% em crédito contemplado no período analisado.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h4 className="font-bold text-primary mb-3">⭐ Excelente Satisfação</h4>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Taxa de satisfação de 97% indica qualidade superior no atendimento e soluções personalizadas que atendem às necessidades dos clientes.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <h4 className="font-bold text-primary mb-3">🎯 Diversificação Estratégica</h4>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Portfólio diversificado de serviços com múltiplas administradoras garante flexibilidade e soluções adaptadas a cada perfil de cliente.
            </p>
          </Card>
        </div>

        {/* Tendências e Recomendações */}
        <Card className="p-8 bg-white border border-border mb-12">
          <h3 className="text-2xl font-bold text-primary mb-6">Tendências e Recomendações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-primary mb-4">📊 Tendências Identificadas</h4>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Crescimento consistente em todos os segmentos de clientes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Aumento progressivo na taxa de satisfação (88% → 97%)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Expansão de crédito contemplado com aceleração anual</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Diversificação equilibrada entre tipos de serviços</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">💡 Recomendações Estratégicas</h4>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <span>Manter foco em atendimento personalizado que gera alta satisfação</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <span>Expandir presença em novos segmentos de mercado</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <span>Investir em tecnologia para melhorar experiência do cliente</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">→</span>
                  <span>Fortalecer parcerias com administradoras para maior flexibilidade</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Pronto para Transformar Seu Futuro Financeiro?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Com mais de 520 clientes satisfeitos e R$ 210 milhões em crédito contemplado, a Unicon Investimentos é sua parceira ideal para crescimento.
          </p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 font-semibold">
            Começar Agora
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 border-t border-primary/20 mt-12">
        <div className="container text-center">
          <p className="text-white/70">
            © 2026 Unicon Investimentos. Dados atualizados em {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </footer>
    </div>
  );
}
