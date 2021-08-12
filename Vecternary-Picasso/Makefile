help:
	@echo Options for make:
	@echo -e "\t make build"
	@echo -e "\t make serve"
	@echo -e "\t make dist"
	@echo -e "\t make bundle"
build:
	@echo -e "\033[1;35m• Preparing CSS assets...\033[0m"
	@npx tailwindcss-cli@latest build ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@echo -e "\033[32m(✓) Compilation finished successfully\033[0m"

serve:
	@echo -e "\033[1;36m• Starting live development server...\033[0m"
	@npx live-server

dist:
	@echo -e "\033[1;35m• Bundling CSS assets...\033[0m"
	@echo -e "\033[1;32m• Tree-shaking unused styles...\033[0m"
	@export NODE_ENV='production' && npx tailwindcss-cli@latest build ./css/raw/tailwind.css -o ./css/build/tailwind.output.css
	@echo -e "\033[32m(✓) Done! Preparing live server to serve assets.\033[0m"
	@read -p "Press ENTER to start server, or CTRL C to stop: "
	@npx live-server
bundle:
	@echo -e "\033[1;35m• Bundling assets into one file...\033[0m"
	@npx html-onefile ./index.html ./app/src/index.html
	@echo -e "\033[1;32m• Running \`cargo build --release\` in directory 'app'...\033[0m"
	@make -C app build
	@echo -e "\033[32m(✓) Done! Compiled app at ./app/target/release/app\033[0m"
