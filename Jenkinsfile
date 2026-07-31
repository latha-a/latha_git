pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Force checkout of the `main` branch from the job's configured remote
                    checkout([$class: 'GitSCM',
                        branches: [[name: 'refs/heads/main']],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [],
                        userRemoteConfigs: scm.getUserRemoteConfigs()
                    ])
                }
            }
        }

                stage('Debug Node') {
                        steps {
                                sh '''#!/bin/bash
                                set -euo pipefail
                                echo "PATH=$PATH"
                                echo "node: $(node -v 2>/dev/null || echo 'not found')"
                                echo "npm: $(npm -v 2>/dev/null || echo 'not found')"
                                '''
                        }
                }

                stage('Install Dependencies') {
                        steps {
                                sh '''#!/bin/bash
                                set -euo pipefail
                                # try npm from PATH, then common macOS/Homebrew locations
                                if command -v npm >/dev/null 2>&1; then
                                    npm ci
                                elif [ -x "/opt/homebrew/bin/npm" ]; then
                                    /opt/homebrew/bin/npm ci
                                elif [ -x "/usr/local/bin/npm" ]; then
                                    /usr/local/bin/npm ci
                                else
                                    echo "ERROR: npm not found. Install Node globally or configure NodeJS tool in Jenkins." >&2
                                    exit 1
                                fi
                                '''
                        }
                }

                stage('Install Playwright Browsers') {
                        steps {
                                sh '''#!/bin/bash
                                set -euo pipefail
                                if command -v npx >/dev/null 2>&1; then
                                    npx playwright install
                                elif [ -x "/opt/homebrew/bin/npx" ]; then
                                    /opt/homebrew/bin/npx playwright install
                                elif [ -x "/usr/local/bin/npx" ]; then
                                    /usr/local/bin/npx playwright install
                                else
                                    echo "ERROR: npx not found; ensure Node/npm are installed." >&2
                                    exit 1
                                fi
                                '''
                        }
                }

                stage('Run Tests') {
                        steps {
                                sh '''#!/bin/bash
                                set -euo pipefail
                                if command -v npx >/dev/null 2>&1; then
                                    npx playwright test
                                elif [ -x "/opt/homebrew/bin/npx" ]; then
                                    /opt/homebrew/bin/npx playwright test
                                else
                                    echo "ERROR: npx not found; cannot run tests." >&2
                                    exit 1
                                fi
                                '''
                        }
                }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            echo 'Playwright report archived. Install the HTML Publisher plugin to enable publishHTML.'
        }
    }
}  