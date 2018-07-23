val circeVersion = "0.9.3"

lazy val root = project
  .in(file("."))
  .settings(
    name := "rock-paper-scissor",
    scalaVersion := "2.12.3",
    resolvers += Resolver.bintrayRepo("buildo", "maven"),
    resolvers += Resolver.bintrayRepo("hseeberger", "maven"),
    libraryDependencies ++= Seq(
      "io.circe" %% "circe-core" % circeVersion,
      "io.circe" %% "circe-generic" % circeVersion,
      "io.circe" %% "circe-parser" % circeVersion,
      "io.buildo" %% "enumero" % "1.2.0",
      "io.buildo" %% "enumero-circe-support" % "1.3.0",
      "io.buildo" %% "wiro-http-server" % "0.6.12",
      "com.typesafe.akka" %% "akka-actor" % "2.5.13",
      "com.typesafe.akka" %% "akka-http" % "10.1.3",
      "com.typesafe.akka" %% "akka-stream" % "2.5.13",
      "de.heikoseeberger" %% "akka-http-circe" % "1.21.0",
      "org.slf4j" % "slf4j-nop" % "1.6.4",
      "org.scalatest" %% "scalatest" % "3.0.5" % "test"
    ),
    addCompilerPlugin(
      "org.scalamacros" % "paradise" % "2.1.1" cross CrossVersion.full)
  )
