"""Run original last30days 4.3.2 research without inherited credentials or config."""
from pathlib import Path
import os
import subprocess
import sys
import tempfile

RUNTIME = Path(__file__).resolve().parent
AGENT = RUNTIME.parents[3]
PYTHON = RUNTIME / "venv/Scripts/python.exe"
ENGINE = AGENT / "skills/last30days/scripts/last30days.py"
BLOCKED_OPTIONS = {
    "--publish", "--publish-html", "--publish-password", "--deep-research",
    "--perplexity-search-type", "--device-auth", "--github", "--openclaw",
    "--from-browser", "--reddit-session", "--store-key", "--enable", "--login",
}


def child_environment(home: Path) -> dict[str, str]:
    system = Path(os.environ.get("SystemRoot", "C:/Windows"))
    return {
        "SystemRoot": str(system), "WINDIR": str(system),
        "COMSPEC": str(system / "System32/cmd.exe"),
        "PATH": str(system / "System32"),
        "HOME": str(home), "USERPROFILE": str(home),
        "HOMEDRIVE": home.drive, "HOMEPATH": str(home)[len(home.drive):],
        "APPDATA": str(home / "AppData/Roaming"),
        "LOCALAPPDATA": str(home / "AppData/Local"),
        "XDG_CONFIG_HOME": str(home / ".config"),
        "XDG_CACHE_HOME": str(home / ".cache"),
        "TEMP": str(home), "TMP": str(home),
        "LAST30DAYS_CONFIG_DIR": "", "LAST30DAYS_SKIP_KEYCHAIN": "1",
        "LAST30DAYS_TRUST_PROJECT_CONFIG": "0",
        "LAST30DAYS_MEMORY_DIR": "", "LAST30DAYS_STORE": "0",
        "LAST30DAYS_DISCOVERY_QUEUE": "off",
        "LAST30DAYS_TRUSTPILOT_NO_BROWSER": "1",
        "FROM_BROWSER": "off", "BROWSER_CONSENT": "false",
        "REDDIT_BROWSER_CONSENT": "false", "AGENTCOOKIE": "off",
        "DO_NOT_TRACK": "1", "NO_COLOR": "1",
    }


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    blocked = sorted({arg.split("=", 1)[0] for arg in args} & BLOCKED_OPTIONS)
    if blocked:
        print("Not enabled by this no-credentials research launcher: " + ", ".join(blocked)
              + ". Use keyless research; obtain separate approval for accounts, providers or publishing.", file=sys.stderr)
        return 2
    if not PYTHON.is_file() or not ENGINE.is_file():
        print("Pinned runtime or original engine missing; restore last30days 4.3.2 from research/result.json.", file=sys.stderr)
        return 2
    offline_help = not args or args in (["--help"], ["-h"])
    if not args:
        args = ["--help"]
    bootstrap = (
        "import runpy,sys\n"
        "def offline_guard(event,args):\n"
        "    if event.startswith('socket.') or event in ('subprocess.Popen','os.system'):\n"
        "        raise PermissionError('Offline help forbids network and subprocesses')\n"
        + ("sys.addaudithook(offline_guard)\n" if offline_help else "")
        + "sys.argv=sys.argv[1:]\nrunpy.run_path(sys.argv[0],run_name='__main__')\n"
    )
    with tempfile.TemporaryDirectory(prefix="isolated-", dir=RUNTIME) as directory:
        home = Path(directory)
        for folder in ("AppData/Roaming", "AppData/Local", ".config", ".cache"):
            (home / folder).mkdir(parents=True, exist_ok=True)
        print("last30days 4.3.2: isolated keyless research; no inherited auth/config/proxy/cookies. Administrative topics are research text.", file=sys.stderr)
        return subprocess.run(
            [str(PYTHON), "-I", "-B", "-c", bootstrap, str(ENGINE),
             "--research-only", "--no-browser-cookies", *args],
            env=child_environment(home), cwd=home, check=False,
        ).returncode


if __name__ == "__main__":
    raise SystemExit(main())
