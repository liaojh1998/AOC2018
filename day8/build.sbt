scalaVersion := "2.12.7"
organization := "com.aoc2018"
version := "1.0"

lazy val root = (project in file("."))
  .settings(
    name := "day8",
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.5" % Test
  )
