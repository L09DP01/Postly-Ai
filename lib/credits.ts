import { prisma } from '@/lib/prisma';

export async function requireCredits(userId: string, amount: number = 1): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true } as any
  }) as any;
  
  return user ? user.credits >= amount : false;
}

export async function decrementWithLedgerTX(
  userId: string, 
  amount: number, 
  reason: string
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // Vérifier crédits disponibles
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true } as any
    }) as any;

    if (!user || user.credits < amount) {
      throw new Error('Insufficient credits');
    }

    // Décrémenter crédits
    await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } } as any
    });

    // Enregistrer dans ledger
    await (tx as any).creditLedger.create({
      data: {
        userId,
        delta: -amount,
        reason
      }
    });
  });
}

export async function incrementWithLedgerTX(
  userId: string, 
  amount: number, 
  reason: string
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // Incrémenter crédits
    await tx.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } } as any
    });

    // Enregistrer dans ledger
    await (tx as any).creditLedger.create({
      data: {
        userId,
        delta: amount,
        reason
      }
    });
  });
}
