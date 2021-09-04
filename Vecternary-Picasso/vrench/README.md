# Vrench

Vrench is Vecternary's no-dependencies custom build system and package manager. It is heavily inspired by CMake and Meson, two build systems that would've been ideal for Vecternary if only they didn't have so many dependencies.

Vrench is unique in that it requires no configuration files. Rather, dependencies are intelligently found and included by Vrench. It is also fully cross-platform, with the option to generate bash build scripts, Unix Makefiles, or Visual Studio solutions. Its smart dependency system resolves conflicts in the dependency tree automatically, preventing the headaches of tools like NPM.

Vrench is packaged as a single binary and can be used to install not only the rest of the Vecternary tools ecosystem, such as Vbundler or Vfmt, but also all other development packages that Vecternary directly or indirectly relies on, including Node.js, Python, GCC, and the Rust build tools. It does this intelligently so that it *won't* affect system-installed packages - you can install Python with Vrench, and it won't cause any issues with a pre-installed system Python. Additionally, it can tailor-install specific versions of these external packages.

Vrench is written in C++, like the rest of Vecternary's tools.
