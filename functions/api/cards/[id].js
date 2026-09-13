2026-09-13T05:01:15.457465Z	Cloning repository...
2026-09-13T05:01:16.634737Z	From https://github.com/46bean/gsmon
2026-09-13T05:01:16.635098Z	 * branch            f7152d043d175f647ca75f30a9cabf886d094f23 -> FETCH_HEAD
2026-09-13T05:01:16.635209Z	
2026-09-13T05:01:16.651405Z	HEAD is now at f7152d0 Update style.css
2026-09-13T05:01:16.65169Z	
2026-09-13T05:01:16.694773Z	
2026-09-13T05:01:16.695133Z	Using v2 root directory strategy
2026-09-13T05:01:16.707656Z	Success: Finished cloning repository files
2026-09-13T05:01:19.857959Z	Checking for configuration in a Wrangler configuration file (BETA)
2026-09-13T05:01:19.858542Z	
2026-09-13T05:01:19.858662Z	Found wrangler.toml file. Reading build configuration...
2026-09-13T05:01:19.86464Z	pages_build_output_dir: public
2026-09-13T05:01:19.864834Z	Build environment variables: (none found)
2026-09-13T05:01:20.036648Z	Successfully read the Wrangler configuration file.
2026-09-13T05:01:20.037064Z	No build command specified. Skipping build step.
2026-09-13T05:01:20.037689Z	Found Functions directory at /functions. Uploading.
2026-09-13T05:01:20.041908Z	 ⛅️ wrangler 3.114.17
2026-09-13T05:01:20.042046Z	-------------------
2026-09-13T05:01:20.827413Z	✘ [ERROR] The symbol "cols" has already been declared
2026-09-13T05:01:20.827854Z	
2026-09-13T05:01:20.827928Z	    ../../../buildhome/repo/functions/api/cards.js:29:8:
2026-09-13T05:01:20.827971Z	      29 │   const cols = light
2026-09-13T05:01:20.828034Z	         ╵         ~~~~
2026-09-13T05:01:20.828113Z	
2026-09-13T05:01:20.828168Z	  The symbol "cols" was originally declared here:
2026-09-13T05:01:20.828224Z	
2026-09-13T05:01:20.828265Z	    ../../../buildhome/repo/functions/api/cards.js:19:8:
2026-09-13T05:01:20.828303Z	      19 │   const cols = light
2026-09-13T05:01:20.828336Z	         ╵         ~~~~
2026-09-13T05:01:20.828397Z	
2026-09-13T05:01:20.828452Z	✘ [ERROR] Unexpected "}"
2026-09-13T05:01:20.828489Z	
2026-09-13T05:01:20.828522Z	    ../../../buildhome/repo/functions/api/cards.js:67:0:
2026-09-13T05:01:20.828552Z	      67 │ }
2026-09-13T05:01:20.828581Z	         ╵ ^
2026-09-13T05:01:20.828615Z	
2026-09-13T05:01:20.83663Z	
2026-09-13T05:01:20.887158Z	[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mBuild failed with 2 errors:[0m
2026-09-13T05:01:20.887401Z	
2026-09-13T05:01:20.887465Z	  ../../../buildhome/repo/functions/api/cards.js:29:8: ERROR: The symbol "cols" has already been declared
2026-09-13T05:01:20.887523Z	  ../../../buildhome/repo/functions/api/cards.js:67:0: ERROR: Unexpected "}"
2026-09-13T05:01:20.887568Z	
2026-09-13T05:01:20.887892Z	
2026-09-13T05:01:20.912093Z	🪵  Logs were written to "/root/.config/.wrangler/logs/wrangler-2026-09-13_05-01-20_527.log"
2026-09-13T05:01:20.976292Z	Failed building Pages Functions.
2026-09-13T05:01:21.673496Z	Failed: generating Pages Functions failed. Check the logs above for more information. If this continues for an unknown reason, contact support: https://cfl.re/3WgEyrH
