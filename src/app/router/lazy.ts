export const lazyContentPage = async () => {
  const { default: Component } = await import("@/pages/ContentPage");

  return { Component };
};

export const lazyNotFoundPage = async () => {
  const { default: Component } = await import("@/pages/NotFoundPage");

  return { Component };
};
