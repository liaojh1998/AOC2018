scalaVersion := "2.12.7"
organization := "com.aoc2018"
version := "1.0"

lazy val root = (project in file("."))
  .settings(
    name := "day8",
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.5" % Test
  )
lazy val part1 = (project in file("part1"))
  .settings(
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.5" % Test
  )
  .aggregate(root)
  .dependsOn(root)
lazy val part2 = (project in file("part2"))
  .settings(
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.5" % Test
  )
  .aggregate(root)
  .dependsOn(root)
