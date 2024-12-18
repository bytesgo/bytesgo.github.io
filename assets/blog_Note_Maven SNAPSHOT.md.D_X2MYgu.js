import{_ as a,o as n,c as e,a6 as p}from"./chunks/framework.BkI9ovSD.js";const g=JSON.parse('{"title":"Maven SNAPSHOT","description":"","frontmatter":{"title":"Maven SNAPSHOT","date":"2023-04-19T00:00:00.000Z","tags":["Maven"],"categories":["笔记"]},"headers":[],"relativePath":"blog/Note/Maven SNAPSHOT.md","filePath":"blog/Note/Maven SNAPSHOT.md","lastUpdated":1734538828000}'),i={name:"blog/Note/Maven SNAPSHOT.md"};function t(l,s,d,c,r,o){return n(),e("div",{"data-pagefind-body":!0},s[0]||(s[0]=[p(`<h1 id="maven-snapshot" tabindex="-1">Maven SNAPSHOT <a class="header-anchor" href="#maven-snapshot" aria-label="Permalink to &quot;Maven SNAPSHOT&quot;">​</a></h1><p>我们知道，Maven 项目第一次构建时，会自动从远程仓库搜索依赖项，并将其下载到本地仓库中。当项目再进行构建时，会直接从本地仓库搜索依赖项并引用，而不会再次向远程仓库获取。这样的设计能够避免项目每次构建时都去远程仓库下载依赖，减轻了网络带宽的压力，但也带来了问题。</p><p>大型的应用软件通常由多个功能模块组成，这些模块一般分别于不同的团队负责开发。假设有两个团队，他们分别负责项目中的 app-ui（前端） 和 data-service（数据服务） 两个模块，且 app-ui 需要依赖 data-service 项目作为数据服务来源。</p><p>基于以上假设，若 data-service 团队正在进行快节奏的 bug 修复及功能增强，会在短时间内高频率地更新代码以及发布版本。就会出现以下情况：</p><ol><li>data-service 团队每次发布新版本更新代码时，都应该通知 app-ui 团队。</li><li>app-ui 团队则需要定期更新其 pom.xml 以获得最新的版本。</li></ol><p>这样，势必会影响开发效率，甚至会影响项目的验收及投产。要解决这个问题，其实很简单，那就是使用 SNAPSHOT（快照）版本。</p><h2 id="snapshot-是什么" tabindex="-1">SNAPSHOT 是什么 <a class="header-anchor" href="#snapshot-是什么" aria-label="Permalink to &quot;SNAPSHOT 是什么&quot;">​</a></h2><p>SNAPSHOT（快照）是一种特殊的版本，它表示当前开发进度的副本。</p><p>与常规版本不同，快照版本的构件在发布时，Maven 会自动为它打上一个时间戳，有了这个时间戳后，当依赖该构件的项目进行构建时，Maven 就能从仓库中找到最新的 SNAPSHOT 版本文件。</p><p>定义一个组件或模块为快照版本，只需要在其 pom.xml 中版本号（version 元素的值）后加上 -SNAPSHOT 即可，例如：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;net.biancheng.www&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;helloMaven&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">packaging</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;jar&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">packaging</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.0-SNAPSHOT&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>要解决上面的问题，现在就十分简单了：data-servcie 团队每次更新代码都使用快照版本发布到仓库中，app-ui 团队则引用快照版本的依赖，这样 app-ui 不再需要重复修改 pom.xml 中的配置，每次构建时都会自动从仓库中获取最新的构件。</p><p>默认情况下对于快照本本的构件，Maven 会每天从仓库中获取一次更新，用户也可以在任何 Maven 命令中使用 -U 参数强制 Maven 检查更新。命令如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mvn clean package -U</span></span></code></pre></div><h2 id="snapshot-版本-vs-release-版本" tabindex="-1">SNAPSHOT 版本 VS RELEASE 版本 <a class="header-anchor" href="#snapshot-版本-vs-release-版本" aria-label="Permalink to &quot;SNAPSHOT 版本 VS RELEASE 版本&quot;">​</a></h2><p>Maven 仓库分为两种，Snapshot 快照仓库和 Release 发行仓库。</p><p>Snapshot 快照仓库用于保存开发过程中的不稳定 SNAPSHOT 版本，Release 发行仓库则用来保存稳定的 RELEASE 版本。</p><p>Maven 会根据模块的版本号（pom.xml 文件中的 version 元素）中是否带有 -SNAPSHOT 来判断是 SNAPSHOT 版本还是正式 RELEASE 版本。带有 -SNAPSHOT 是SNAPSHOT（快照）版本，不带 -SNAPSHOT 的就是正式 RELEASE（发布）版本。</p><p>SNAPSHOT 版本和 RELEASE 版本区别如下表：</p><table tabindex="0"><thead><tr><th>区别</th><th>SNAPSHOT 版本</th><th>RELEASE 版本</th></tr></thead><tbody><tr><td>定义</td><td>版本号中带有 -SNAPSHOT</td><td>版本号中不带有 -SNAPSHOT</td></tr><tr><td>发布仓库</td><td>Snapshot 快照仓库</td><td>Release 发行仓库</td></tr><tr><td>是否从远程仓库自动获取更新</td><td>在不更改版本号的前提下，直接编译打包时，Maven 会自动从远程仓库上下载最新的快照版本。</td><td>在不更改版本号的前提下，直接编译打包时，如果本地仓库已经存在该版本的模块，则 Maven 不会主动去远程仓库下载。</td></tr><tr><td>稳定性</td><td>快照版本往往对应了大量带有时间戳的构件，具有不稳定性。</td><td>发布版本只对应了唯一的构件，具有稳定性。</td></tr><tr><td>使用场景</td><td>快照版本只应该在组织内部的项目中依赖使用。</td><td>Maven 项目使用的组织外的依赖项都应该时发布版本的，不应该使用任何的快照版本依赖，否则会造成潜在的风险。</td></tr><tr><td>发布前是否需要修改</td><td>当项目经过完善的测试后，需要上线时，应该将项目从快照版本更改为发布版本</td><td>不需要修改</td></tr></tbody></table><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>打开命令行窗口，跳转到 D:\\maven\\secondMaven 目录，执行以下 mvn 命令。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mvn clean package -U</span></span></code></pre></div><p>命令执行结果如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[INFO] Scanning for projects...</span></span>
<span class="line"><span>[WARNING]</span></span>
<span class="line"><span>[WARNING] Some problems were encountered while building the effective model for net.biancheng.www:secondMaven:jar:1.0-SNAPSHOT</span></span>
<span class="line"><span>[WARNING] &#39;dependencies.dependency.systemPath&#39; for net.biancheng.www:helloMaven:jar should use a variable instead of a hard-coded path D:\\maven\\helloMaven\\target\\helloMaven-1.0-SNAPSHOT.jar @ line 37, column 16</span></span>
<span class="line"><span>[WARNING]</span></span>
<span class="line"><span>[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.</span></span>
<span class="line"><span>[WARNING]</span></span>
<span class="line"><span>[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.</span></span>
<span class="line"><span>[WARNING]</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] -------------------&lt; net.biancheng.www:secondMaven &gt;--------------------</span></span>
<span class="line"><span>[INFO] Building secondMaven 1.0-SNAPSHOT</span></span>
<span class="line"><span>[INFO] --------------------------------[ jar ]---------------------------------</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ secondMaven ---</span></span>
<span class="line"><span>[INFO] Deleting D:\\maven\\secondMaven\\target</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ secondMaven ---</span></span>
<span class="line"><span>[WARNING] Using platform encoding (GBK actually) to copy filtered resources, i.e. build is platform dependent!</span></span>
<span class="line"><span>[INFO] skip non existing resourceDirectory D:\\maven\\secondMaven\\src\\main\\resources</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ secondMaven ---</span></span>
<span class="line"><span>[INFO] Changes detected - recompiling the module!</span></span>
<span class="line"><span>[WARNING] File encoding has not been set, using platform encoding GBK, i.e. build is platform dependent!</span></span>
<span class="line"><span>[INFO] Compiling 1 source file to D:\\maven\\secondMaven\\target\\classes</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ secondMaven ---</span></span>
<span class="line"><span>[WARNING] Using platform encoding (GBK actually) to copy filtered resources, i.e. build is platform dependent!</span></span>
<span class="line"><span>[INFO] skip non existing resourceDirectory D:\\maven\\secondMaven\\src\\test\\resources</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ secondMaven ---</span></span>
<span class="line"><span>[INFO] Changes detected - recompiling the module!</span></span>
<span class="line"><span>[WARNING] File encoding has not been set, using platform encoding GBK, i.e. build is platform dependent!</span></span>
<span class="line"><span>[INFO] Compiling 1 source file to D:\\maven\\secondMaven\\target\\test-classes</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ secondMaven ---</span></span>
<span class="line"><span>[INFO] Surefire report directory: D:\\maven\\secondMaven\\target\\surefire-reports</span></span>
<span class="line"><span>-------------------------------------------------------</span></span>
<span class="line"><span>T E S T S</span></span>
<span class="line"><span>-------------------------------------------------------</span></span>
<span class="line"><span>Running net.biancheng.www.AppTest</span></span>
<span class="line"><span>Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.008 sec</span></span>
<span class="line"><span>Results :</span></span>
<span class="line"><span>Tests run: 1, Failures: 0, Errors: 0, Skipped: 0</span></span>
<span class="line"><span>[INFO]</span></span>
<span class="line"><span>[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ secondMaven ---</span></span>
<span class="line"><span>[INFO] Building jar: D:\\maven\\secondMaven\\target\\secondMaven-1.0-SNAPSHOT.jar</span></span>
<span class="line"><span>[INFO] ------------------------------------------------------------------------</span></span>
<span class="line"><span>[INFO] BUILD SUCCESS</span></span>
<span class="line"><span>[INFO] ------------------------------------------------------------------------</span></span>
<span class="line"><span>[INFO] Total time:  2.413 s</span></span>
<span class="line"><span>[INFO] Finished at: 2021-03-04T10:24:32+08:00</span></span>
<span class="line"><span>[INFO] ------------------------------------------------------------------------</span></span></code></pre></div>`,25)]))}const u=a(i,[["render",t]]);export{g as __pageData,u as default};
