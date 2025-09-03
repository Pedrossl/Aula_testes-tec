# Como configurar e rodar o projeto TypeScript

## 1. Inicialize o projeto
```zsh
npm init -y
```

## 2. Instale as dependências
```zsh
npm install --save-dev typescript ts-node jest ts-jest @types/jest @types/mocha @types/node
```

## 3. Crie o arquivo de configuração do TypeScript
```zsh
npx tsc --init
```

## 4. Crie o arquivo de configuração do Jest para TypeScript
```zsh
npx ts-jest config:init
```

## 5. (Opcional) Instale o prompt-sync para menu interativo
```zsh
npm install prompt-sync
```

## 6. Para rodar os testes
```zsh
npx jest
```

## Configuração para usar import/export (ES Modules)

Adicione ao seu tsconfig.json:
```jsonc
"verbatimModuleSyntax": false,
 "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
  // "verbatimModuleSyntax": false,

```

```jsonc
{
"compilerOptions": {
"module": "CommonJS",
"target": "esnext",
"verbatimModuleSyntax": false,
"sourceMap": true,
"declaration": true,
"declarationMap": true,
"noUncheckedIndexedAccess": true,
"exactOptionalPropertyTypes": true,
"strict": true,
"jsx": "react-jsx",
"isolatedModules": true,
"noUncheckedSideEffectImports": true,
"moduleDetection": "force",
"skipLibCheck": true,
"allowImportingTsExtensions": true,
"noEmit": true
}
}
```

Assim, você pode usar `import` e `export` normalmente em todos os arquivos TypeScript.

