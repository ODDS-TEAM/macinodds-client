pipeline {
    agent any

    tools {nodejs "node12"}

    environment {
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
                    // sh "docker build -t p1 ."
                    // sh "docker run --rm -d -p 80:80 p1"
                    sh "npm install"
                    sh "npm run build"

                }
            }
        }
        stage ('Push') {
            steps {
            }
        }

        stage('Deploy') {
            steps {
                sshPublisher(
                    continueOnError: false, failOnError: true,
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