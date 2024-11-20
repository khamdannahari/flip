module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "none", ignoreRestSiblings: false },
    ],
  },
  ignorePatterns: ["**/expo-env.d.ts", "node_modules/"],
};
