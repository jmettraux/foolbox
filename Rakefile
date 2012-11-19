
require 'rake'
require 'rake/clean'


#
# tasks

CLEAN.include('pkg')

task :default => [ :clean ]

desc %q{
  packages the ruote-fluo js files to pkg/
}
task :package => :clean do

  FileUtils.rm_rf('pkg')

  version = File.read(
    'js/foolbox.js'
  ).match(
    / var VERSION *= *['"]([^'"]+)/
  )[1]

  sha = `git log -1 --format="%H"`.strip[0, 7]

  sh 'mkdir pkg'

  Dir['js/*.js'].each do |path|

    fname = File.basename(path, '.js')

    FileUtils.cp(path, "pkg/#{fname}-#{version}.js")

    sh "yuicompressor #{path} -o pkg/#{fname}-#{version}.min.js"

    File.open("pkg/foolbox-all-#{version}.js", 'ab') do |f|
      f.puts(File.read(path))
    end

    sh(
      "yuicompressor " +
      "pkg/foolbox-all-#{version}.js " +
      "-o pkg/foolbox-all-#{version}.min.js")
  end

  Dir['pkg/*.min.js'].each do |path|

    fname = File.basename(path)

    header = "/* #{fname} | MIT license: http://git.io/RAWt2w */\n"

    s = header + File.read(path)
    File.open(path, 'wb') { |f| f.print(s) }
  end

  footer = "\n/* compiled from commit #{sha} */\n"

  Dir['pkg/*.js'].each { |path| File.open(path, 'ab') { |f| f.puts(footer) } }
end

desc %q{
  alias for 'package'
}
task :pkg => :package

