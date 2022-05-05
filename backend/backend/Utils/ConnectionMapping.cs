using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Utils
{
    public static class ConnectionMapping
    {
        public static readonly Dictionary<int, HashSet<string>> _connections =
            new Dictionary<int, HashSet<string>>();

        private static int counter = 1;

        public static int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public static void Add(int key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
                    counter++;

                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public static IEnumerable<string> GetConnections(int key)
        {
            HashSet<string> connections;
            if (_connections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public static void Remove(int key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _connections.Remove(key);
                    }
                }
            }
        }

    }
}

