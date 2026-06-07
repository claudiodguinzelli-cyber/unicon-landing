import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import axios from "axios";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    createLead: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        phone: z.string().min(1, "Telefone é obrigatório"),
        creditAmount: z.string().min(1, "Valor de crédito é obrigatório"),
        creditPurpose: z.string().min(1, "Finalidade é obrigatória"),
      }))
      .mutation(async ({ input }) => {
        // Validar se o token está configurado
        if (!ENV.agendorApiToken) {
          console.error("AGENDOR_API_TOKEN não está configurado");
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Configuração do servidor incompleta. Tente novamente mais tarde.",
          });
        }

        try {
          // Criar lead no Agendor
          const agendorResponse = await axios.post(
            "https://api.agendor.com.br/v3/leads",
            {
              name: input.name,
              phone: input.phone,
              email: "",
              description: `Crédito Pretendido: ${input.creditAmount}\nFinalidade: ${input.creditPurpose}`,
              source: "Website",
            },
            {
              headers: {
                "Authorization": `Token ${ENV.agendorApiToken}`,
                "Content-Type": "application/json",
              },
            }
           );

          return {
            success: true,
            leadId: agendorResponse.data?.id,
            message: "Lead criado com sucesso no Agendor!",
          };
        } catch (error: any) {
          // Log detalhado do erro para debugging
          console.error("Erro ao criar lead no Agendor:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });

          // Retornar erro mais específico baseado no status
          if (error.response?.status === 401 || error.response?.status === 403) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Erro de autenticação com o CRM. Contate o suporte.",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Falha ao processar sua solicitação. Tente novamente.",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
