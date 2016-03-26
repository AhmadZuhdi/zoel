function resolveModule(obj) {
  const module = obj && obj.__esModule ? obj : { default: obj };
  return module.default;
}

export { resolveModule };
