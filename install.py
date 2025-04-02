import subprocess

def install_requirements():
    pip_path ='pip'
    packages = [
        "django==5.1.7",
        "django-jazzmin==3.0.1"
    ]

    for pacckage in packages:
        subprocess.run([pip_path, "install", pacckage], check=True)
        print("Усі пакети успішно встановлені")

if __name__ == "__main__":
    install_requirements()
