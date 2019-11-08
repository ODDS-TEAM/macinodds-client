def to_push
pipeline {
    agent any
    tools {nodejs "node12"}
    options {
        ansiColor('xterm')
    }
    environment {
        registry = "registry.odds.team/internship/macinodds-web"
        registryCredential = 'dockerhub'
        sourceFiles	="dist/macinodds/**"
        removePrefix="dist/macinodds"
        remoteDirectory="html/"	
        configName="macinodds.tk"
        host="https://registry.odds.team"
    }
    stages {
        stage('Build') {
            steps {
                script {
                    sh "export"
                    // sh "npm install"
                    // sh "npm run build"
                    sh "docker login registry.odds.team"
                    sh "docker build -t registry.odds.team/internship/macinodds-web:${env.BUILD_NUMBER} ."
                }
            }
        }
        stage('push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'mac-in-odds', url: 'https://registry.odds.team') {
                        sh "docker push registry.odds.team/internship/macinodds-web:${env.BUILD_NUMBER}"
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
}