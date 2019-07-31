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
                    sh "npm install"
                    sh "npm run build"
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