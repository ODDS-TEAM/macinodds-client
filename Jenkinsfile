pipeline {
    agent any

    tools {nodejs "node12"}

    stages {
        stage('Build') {
            steps {
                script {
                    sh "export"
                    sh "npm install"
                    sh "npm run build"
                    sh "docker run -p 80:80"
                }
            }
        }
        stage('Push') {
            steps {
                echo 'Pushing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}