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