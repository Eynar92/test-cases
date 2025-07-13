export const mockTestCases = [
    {
        id: 1,
        title: "Login Flow",
        feature: "Authentication",
        status: "passed",
        description: "Verificar que el usuario puede iniciar sesión correctamente.",
        tags: ["UI", "Critical"],
    },
    {
        id: 2,
        title: "API: Create User",
        feature: "User Management",
        status: "pending",
        description: "Validar la creación de usuarios via API.",
        tags: ["API", "Post"],
    },
    {
        id: 3,
        title: "Checkout Process",
        feature: "E-Commerce",
        status: "failed",
        description: "Flujo completo de compra con items en el carrito.",
        tags: ["UI", "Checkout"],
    }
]