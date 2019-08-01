pipeline {
    agent any
    tools {nodejs "node12"}
    environment {
        registry = "registry.odds.team/internship/macinodds-web"
        registryCredential = 'dockerhub'
        sourceFiles	="dist/macinodds/**"
        removePrefix="dist/macinodds"
        remoteDirectory="html/"	
        configName="macinodds.tk"
    }
    stages {
        stage('Build') {
            steps {
                script {
                    sh "export"
                    // sh "npm install"
                    // sh "npm run build"
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"

                }
            }
        }
        stage('push') {
            steps {
                script {
                    // sh "export"
                    // sh "npm install"
                    // sh "npm run build"
                    // sh "docker push oddsteam/macinodds-web:${env.BUILD_NUMBER} ."
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('SSH transfer') {
            steps {
                sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: "${configName}",
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "${sourceFiles}",
                                        removePrefix: "${removePrefix}",
                                        remoteDirectory: "${remoteDirectory}",
                                        patternSeparator: '[, ]+',
                                        execTimeout: 120000,
                                        cleanRemote: false, 
                                        flatten: false,
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        remoteDirectorySDF: false
                                    )
                                ]
                            )
                        ]
                )
            }
        }
        
       
    }

    post {
        success {
            slackSend teamDomain: 'for-odds-team', 
                tokenCredentialId: 'slack-for-odds-team', 
                username: 'admin', 
                color: "good", 
                message: "🎉SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} 😀 (<${env.BUILD_URL}|Open>)"
        }
        failure {
            slackSend teamDomain: 'for-odds-team', 
                tokenCredentialId: 'slack-for-odds-team', 
                username: 'admin', 
                color: "danger", 
                message: "❗️FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} 🤢 (<${env.BUILD_URL}|Open>)"
        }
        unstable {
            slackSend teamDomain: 'for-odds-team', 
                tokenCredentialId: 'slack-for-odds-team', 
                username: 'admin', 
                color: "warning", 
                message: "⚠️UNSTABLE: ${env.JOB_NAME} #${env.BUILD_NUMBER} 😕 (<${env.BUILD_URL}|Open>)"
        }
    }
}