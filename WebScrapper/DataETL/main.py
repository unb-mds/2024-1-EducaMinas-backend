import subprocess


def run_scripts():
    scripts = [
        'ETLMunicipioJSON.py',
        'ETLMunicipioPostgres.py',
        'ETLIndicadorPostgres.py',
        'ETLMatriculaPostgres.py'
    ]

    for script in scripts:
        subprocess.run(['python', script])


if __name__ == "__main__":
    run_scripts()
