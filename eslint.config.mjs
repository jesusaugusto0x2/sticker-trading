import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import airbnb from "eslint-config-airbnb";
import airbnbTs from "eslint-config-airbnb-typescript";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // Next.js base — already registers react, react-hooks, import, jsx-a11y
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      ...airbnb.rules,
      ...airbnbTs.rules,
      // Next.js handles the React import automatically
      "react/react-in-jsx-scope": "off",
      // Named exports are preferred in this project
      "import/prefer-default-export": "off",
      // Allow JSX only in .tsx files
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    },
  },
  // Must be last — disables all ESLint rules that conflict with Prettier
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
