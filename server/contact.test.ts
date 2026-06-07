import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import axios from "axios";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios);

// Mock ENV to provide agendorApiToken
vi.mock("./_core/env", () => ({
  ENV: {
    agendorApiToken: "test-token-123",
  },
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn( ),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.createLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a lead in Agendor with valid input", async () => {
    const mockAgendorResponse = {
      data: {
        id: "lead-123",
        name: "João Silva",
        phone: "11999999999",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockAgendorResponse);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.createLead({
      name: "João Silva",
      phone: "11999999999",
      creditAmount: "R$ 50.000",
      creditPurpose: "Compra de equipamento",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBe("lead-123");
    expect(result.message).toContain("sucesso");

    // Verify axios was called with correct parameters
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.agendor.com.br/v3/leads",
      expect.objectContaining({
        name: "João Silva",
        phone: "11999999999",
        description: expect.stringContaining("R$ 50.000" ),
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Authorization": expect.stringContaining("Token"),
        }),
      })
    );
  });

  it("should reject when name is missing", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.createLead({
        name: "",
        phone: "11999999999",
        creditAmount: "R$ 50.000",
        creditPurpose: "Compra de equipamento",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("obrigatório");
    }
  });

  it("should reject when phone is missing", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.createLead({
        name: "João Silva",
        phone: "",
        creditAmount: "R$ 50.000",
        creditPurpose: "Compra de equipamento",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("obrigatório");
    }
  });

  it("should handle Agendor API errors gracefully", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("API Error"));

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.createLead({
        name: "João Silva",
        phone: "11999999999",
        creditAmount: "R$ 50.000",
        creditPurpose: "Compra de equipamento",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toBeTruthy();
    }
  });
});
