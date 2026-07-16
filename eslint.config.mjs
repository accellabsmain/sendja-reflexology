// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base configuration
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Abaikan file build, node_modules, dan konfigurasi
    ignores: ['dist/**', 'build/**', 'node_modules/**', '.next/**', '*.config.*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
    rules: {
      /* ====================================================================
       * ATURAN ROAS-ING & KATA-KATA MENYAKITKAN (ZERO TOLERANCE FOR STUPIDITY)
       * ==================================================================== */

      // 1. Larangan keras menggunakan 'var'
      'no-var': 'error',

      // 2. Larangan keras meninggalkan console.log
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // 3. Larangan nested ternary (ternary bersarang yang bikin pusing)
      'no-nested-ternary': 'error',

      // 4. Larangan dead code (code tidak terpakai/unreachable)
      'no-unreachable': 'error',

      // 5. RESTRICTED SYNTAX (AST SELECTORS) - KATA-KATA MENYAKITKAN DI SINI!
      'no-restricted-syntax': [
        'error',
        {
          // Mencegah penggunaan == atau != (harus === atau !==)
          selector: "BinaryExpression[operator='=='], BinaryExpression[operator='!=']",
          message:
            "❌ BODOH! Kenapa masih pakai '==' atau '!='? Kamu mau serahkan bug sistem pada type coercion Javascript? Pakai '===' atau '!=='. Belajar lagi sana!",
        },
        {
          // Mencegah empty catch block: try { ... } catch (e) {}
          selector: 'CatchClause > BlockStatement[body.length=0]',
          message:
            "❌ Pengecut! Block catch kosong terdeteksi. Kamu ngubur error kayak ngubur aib sendiri. Handle error-nya, jangan cuma ditutup-tutupi!",
        },
        {
          // Mencegah penggunaan console.log/info/debug secara spesifik dengan pesan custom
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name=/^(log|info|debug)$/]",
          message:
            "❌ Sampah console.log terdeteksi! Hapus sekarang! Kamu mau nge-debug di production dan dimalu-maluin satu tim pas code review?",
        },
        {
          // Mencegah magic numbers (angka gaib tanpa deklarasi variabel), kecuali 0, 1, -1
          selector:
            "Literal[value=/^[0-9]+$/]:not(VariableDeclarator > Literal):not(Property > Literal):not(BinaryExpression[operator='==='] > Literal)",
          message:
            "❌ Angka gaib (Magic Number) dari mana ini?! Jangan bikin orang lain nebak pikiranmu. Jadikan konstanta yang jelas namanya!",
        },
        {
          // MENGAWAL DESIGN.MD: Mencegah hardcoded pure black (#000000/#000) dan pure white (#ffffff/#fff)
          selector: "Literal[value=/^#(000000|000|ffffff|fff)$/i]",
          message:
            "❌ PELANGGARAN DESIGN.MD! Dilarang keras pakai Pure Black atau Pure White! Estetika kamu nol besar. Gunakan token warna Obsidian (#0D0C0F) atau Warm Ivory (#F4F1EA) sesuai panduan spa mewah kita!",
        },
        {
          // Mencegah penggunaan eval() yang sangat berbahaya
          selector: "CallExpression[callee.name='eval']",
          message:
            "❌ EVAL TERDETEKSI! Kamu mau ngundang hacker buat nge-hack server Sendja Spa? Hapus sekarang juga sebelum kamu saya pecat!",
        },
      ],

      /* ====================================================================
       * ATURAN KHUSUS TYPESCRIPT - BIAR NGGAK MALAS NGE-TYPE
       * ==================================================================== */
      
      // Mencegah penggunaan type 'any' dengan pesan menyakitkan
      '@typescript-eslint/no-explicit-any': 'off', // Kita matikan default-nya biar bisa pakai custom message di bawah
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            any: {
              message:
                "❌ BODOH! Pake type 'any'? Kalau malas mikirin tipe data, mending ngoding pakai notepad aja nggak usah pakai TypeScript! Tulis type yang benar!",
            },
            String: {
              message: "❌ Gunakan 'string' (huruf kecil), bukan 'String'. Dasar newbie!",
            },
            Boolean: {
              message: "❌ Gunakan 'boolean' (huruf kecil), bukan 'Boolean'.",
            },
            Number: {
              message: "❌ Gunakan 'number' (huruf kecil), bukan 'Number'.",
            },
            Object: {
              message: "❌ Tipe 'Object' itu terlalu umum dan tidak berguna. Definisikan interface atau record yang jelas!",
            },
          },
        },
      ],

      // Mencegah variabel yang dideklarasikan tapi tidak dipakai
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          minimumDescriptionLength: 10,
        },
      ],
    },
  }
);
