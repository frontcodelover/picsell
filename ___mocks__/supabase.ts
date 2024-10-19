export const supabase = {
  auth: {
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      data: [],
      error: null,
    })),
  })),
};
