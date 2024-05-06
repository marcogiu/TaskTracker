{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = with pkgs; [
    nodejs_20
    nodePackages.nodemon
    nodePackages.typescript
    nodePackages.ts-node
    # Aggiungi qui eventuali altri pacchetti NPM globali necessari
  ];

  env = { };

  idx = {
    extensions = [
      "dbaeumer.vscode-eslint" # Estensione ESLint
      "esbenp.prettier-vscode" # Estensione Prettier
      # Aggiungi altre estensioni di VSCode che ritieni necessarie
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "bash" "-c" "cd client && npm run dev" ];
          manager = "web";
          env = {
            PORT = "$PORT"; # IDX sostituisce automaticamente $PORT con la porta assegnata
          };
        };
        api = {
          command = [ "bash" "-c" "cd server && npm run start" ];
          manager = "web";
          env = {
            PORT = "$PORT"; # IDX sostituisce automaticamente $PORT con una porta assegnata differente se necessario
          };
        };
      };
    };

    workspace = {
      onCreate = {
        npmInstall = "bash -c 'cd client && npm install && cd ../server && npm install'";
      };
      onStart = {
        watch-backend = "bash -c 'cd server && npm run start:dev'"; # Comando per avviare il monitoraggio del backend
        watch-frontend = "bash -c 'cd client && npm run dev'"; # Comando per avviare il frontend
      };
    };
  };
}
