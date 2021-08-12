# Vtool

Vtool is Vecternary's no-dependencies custom build system and package manager. It is heavily inspired by CMake and Meson, two build systems that would've been ideal for Vecternary if only they didn't have so many dependencies.

Vtool is unique in that it requires no configuration files. Rather, dependencies are intelligently found and included by Vtool. It is also fully cross-platform, with the option to generate bash build scripts, Unix Makefiles, or Visual Studio solutions. Its smart dependency system resolves conflicts in the dependency tree automatically, preventing the headaches of tools like NPM.
