pipeline {
    agent any

    tools {nodejs "node12"}

    stages {
        stage('Build') {
            steps {
                script {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}