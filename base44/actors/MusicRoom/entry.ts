import { Actor } from 'base44:runtime/actors';

// ── THE MUSIC ROOM ─────────────────────────────────────────────────────────────
// This room exists to answer one question and nothing else: is anyone else here?
//
// It keeps no record, writes nothing to storage, and holds no name, address, place
// or history for anyone. It counts the sockets that are open right now and tells
// each of them a single true/false — never a number, so there is nothing here to
// rank, screenshot, keep or sell. When a page closes, that fact leaves with it and
// nothing of it remains anywhere.
//
// It takes no input at all: a client cannot make this room say anything untrue.

const MAX_HERE = 200;

export default class MusicRoom extends Actor {
  here = new Set();

  // Runs on any wake. A hibernation wake keeps sockets ATTACHED without re-running
  // handleConnect, so the live set is rebuilt from the connections themselves — the
  // room has no stored state to rehydrate, and nothing to get out of step.
  handleStart() {
    this.here = new Set(this.getConnections().map((c) => c.id));
    this.announce();
  }

  handleConnect(conn) {
    if (!this.here.has(conn.id) && this.here.size >= MAX_HERE) {
      conn.reject(4001, 'room full');
      return;
    }
    // A reconnect is routine: the same id reclaims its place rather than counting twice.
    this.here.add(conn.id);
    this.announce();
  }

  handleClose(conn) {
    this.here.delete(conn.id);
    this.announce();
  }

  handleMessage() {
    // The room accepts no input. Nothing a client sends can change what it says.
    return;
  }

  announce() {
    // One boolean. Not a count, not a peak, not a place, not a person.
    this.broadcast({ type: 'presence', together: this.here.size > 1 });
  }
}